'use client';

import { useEffect, useState } from 'react';

const steps = [
  { label: 'Scanning posts…', duration: 15000 },
  { label: 'Analyzing images…', duration: 20000 },
  { label: 'Identifying interests…', duration: 15000 },
  { label: 'Crafting gift guide…', duration: 10000 },
];

export default function LoadingState({ platform }: { platform: string }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers = steps.map((step, i) => {
      const timer = setTimeout(() => setStepIndex(i), elapsed);
      elapsed += step.duration;
      return timer;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 animate-spin-reverse" />
      </div>

      <div className="text-center">
        <p className="text-white font-semibold text-lg">{steps[stepIndex].label}</p>
        <p className="text-gray-500 text-sm mt-1">
          Scanning {platform === 'instagram' ? 'Instagram' : 'TikTok'} posts with AI
        </p>
      </div>

      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stepIndex ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' : 'bg-white/10 w-4'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
