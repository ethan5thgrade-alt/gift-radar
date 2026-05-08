import { NextRequest, NextResponse } from 'next/server';
import { getInstagramImages, getTikTokThumbnails } from '@/lib/scraper';
import { analyzeProfile } from '@/lib/analyzer';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const { username, platform } = await req.json();

    if (!username || !platform) {
      return NextResponse.json({ error: 'Username and platform are required' }, { status: 400 });
    }

    const cleanUsername = username.replace('@', '').trim();

    let imageUrls: string[];

    if (platform === 'instagram') {
      imageUrls = await getInstagramImages(cleanUsername);
    } else {
      imageUrls = await getTikTokThumbnails(cleanUsername);
    }

    if (imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'No posts found. The account may be private, empty, or not exist.' },
        { status: 404 }
      );
    }

    const result = await analyzeProfile(imageUrls, cleanUsername, platform);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
