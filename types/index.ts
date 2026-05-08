export interface GiftSuggestion {
  name: string;
  reason: string;
  priceRange: string;
  category: string;
  emoji: string;
}

export interface AnalysisResult {
  overview: string;
  hobbies: string[];
  gifts: GiftSuggestion[];
  imageCount: number;
  platform: string;
  username: string;
}

export type Platform = 'instagram' | 'tiktok';
