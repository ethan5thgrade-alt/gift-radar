import Anthropic from '@anthropic-ai/sdk';
import { AnalysisResult } from '@/types';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function analyzeProfile(
  imageUrls: string[],
  username: string,
  platform: string
): Promise<AnalysisResult> {
  const images = imageUrls.slice(0, 10);

  const imageContent: Anthropic.ImageBlockParam[] = images.map(url => ({
    type: 'image',
    source: { type: 'url', url },
  }));

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: [
        ...imageContent,
        {
          type: 'text',
          text: `You're looking at ${images.length} posts from @${username}'s ${platform} profile.

Analyze their personality, lifestyle, and interests from these images, then generate a personalized gift guide.

Return ONLY valid JSON (no markdown, no code blocks, no explanation):
{
  "overview": "2-3 sentence description of who this person seems to be based on their posts",
  "hobbies": ["specific hobby 1", "specific hobby 2", "...up to 7 hobbies"],
  "gifts": [
    {
      "name": "Specific Product Name",
      "reason": "One sentence explaining why they'd love this, referencing what you saw in their posts",
      "priceRange": "$25-50",
      "category": "outdoor",
      "emoji": "🎒"
    }
  ]
}

Rules:
- Provide exactly 8 diverse gift ideas
- Mix price points: include 2 under $30, 3 between $30-100, 2 between $100-200, 1 over $200
- Categories: outdoor, tech, creative, fitness, food, home, fashion, travel, other
- Be specific with gift names (e.g. "Stanley Adventure Quencher 40oz" not just "water bottle")
- The reason should reference something specific you noticed in their posts`,
        },
      ],
    }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '{}';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse AI response');

  const result = JSON.parse(jsonMatch[0]);
  return { ...result, imageCount: images.length, platform, username };
}
