'use client';

import { AnalysisResult } from '@/types';
import GiftCard from './GiftCard';

const hobbyColors = [
  'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'bg-green-500/20 text-green-300 border-green-500/30',
  'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
];

export default function ResultsDisplay({
  result,
  onReset,
}: {
  result: AnalysisResult;
  onReset: () => void;
}) {
  const platformIcon = result.platform === 'instagram' ? '📸' : '🎵';
  const platformName = result.platform === 'instagram' ? 'Instagram' : 'TikTok';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            {platformIcon} @{result.username} · {platformName} · {result.imageCount} posts analyzed
          </p>
          <h2 className="text-white text-2xl font-bold mt-1">Gift Guide</h2>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl"
        >
          ← New search
        </button>
      </div>

      {/* Overview */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">Their Vibe</p>
        <p className="text-gray-200 leading-relaxed">{result.overview}</p>
      </div>

      {/* Hobbies */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Interests & Hobbies</p>
        <div className="flex flex-wrap gap-2">
          {result.hobbies.map((hobby, i) => (
            <span
              key={hobby}
              className={`text-sm px-3 py-1.5 rounded-full border font-medium capitalize ${hobbyColors[i % hobbyColors.length]}`}
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>

      {/* Gift Grid */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Perfect Gifts · {result.gifts.length} ideas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {result.gifts.map((gift, i) => (
            <GiftCard key={i} gift={gift} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
