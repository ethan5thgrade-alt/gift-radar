'use client';

import { GiftSuggestion } from '@/types';

const categoryColors: Record<string, string> = {
  outdoor: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  tech: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  creative: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
  fitness: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
  food: 'from-yellow-500/20 to-orange-400/20 border-yellow-500/30',
  home: 'from-teal-500/20 to-cyan-600/20 border-teal-500/30',
  fashion: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  travel: 'from-sky-500/20 to-blue-600/20 border-sky-500/30',
  other: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

const categoryBadge: Record<string, string> = {
  outdoor: 'bg-green-500/20 text-green-300',
  tech: 'bg-blue-500/20 text-blue-300',
  creative: 'bg-purple-500/20 text-purple-300',
  fitness: 'bg-orange-500/20 text-orange-300',
  food: 'bg-yellow-500/20 text-yellow-300',
  home: 'bg-teal-500/20 text-teal-300',
  fashion: 'bg-pink-500/20 text-pink-300',
  travel: 'bg-sky-500/20 text-sky-300',
  other: 'bg-gray-500/20 text-gray-300',
};

export default function GiftCard({ gift, index }: { gift: GiftSuggestion; index: number }) {
  const colors = categoryColors[gift.category] || categoryColors.other;
  const badge = categoryBadge[gift.category] || categoryBadge.other;
  const searchQuery = encodeURIComponent(gift.name);

  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br p-5 ${colors} flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{gift.emoji}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${badge}`}>
          {gift.category}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-white text-sm leading-snug">{gift.name}</h3>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{gift.reason}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span className="text-white font-semibold text-sm">{gift.priceRange}</span>
        <a
          href={`https://www.amazon.com/s?k=${searchQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          Shop →
        </a>
      </div>
    </div>
  );
}
