'use client';

import { useState } from 'react';
import { AnalysisResult, Platform } from '@/types';
import LoadingState from '@/components/LoadingState';
import ResultsDisplay from '@/components/ResultsDisplay';

export default function Home() {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), platform }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError('');
    setUsername('');
  }

  return (
    <main className="min-h-screen bg-[#08080f] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        {/* Nav */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="font-bold text-lg tracking-tight">GiftRadar</span>
          </div>
          <span className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full">
            Powered by Claude AI
          </span>
        </div>

        {/* Search / Hero */}
        {!loading && !result && (
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-4 py-1.5 rounded-full">
                AI-Powered Gift Finder
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Find the{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  perfect gift
                </span>{' '}
                for anyone
              </h1>
              <p className="text-gray-400 text-lg">
                Drop someone&apos;s Instagram or TikTok username and our AI analyzes their posts to
                discover their hobbies and build a personalized gift guide.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="w-full max-w-lg space-y-4">
              {/* Platform toggle */}
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                {(['instagram', 'tiktok'] as Platform[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      platform === p
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{p === 'instagram' ? '📸' : '🎵'}</span>
                    <span className="capitalize">{p}</span>
                  </button>
                ))}
              </div>

              {/* Username input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  @
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-lg"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!username.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/30 text-base"
              >
                Analyze Profile →
              </button>
            </form>

            {/* How it works */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-4">
              {[
                { icon: '🔍', label: 'Scan posts', desc: 'AI reads their public profile' },
                { icon: '🧠', label: 'Find interests', desc: 'Claude identifies hobbies & vibes' },
                { icon: '🎁', label: 'Gift guide', desc: 'Personalized suggestions with links' },
              ].map(item => (
                <div key={item.label} className="text-center space-y-1">
                  <div className="text-2xl">{item.icon}</div>
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && <LoadingState platform={platform} />}

        {result && !loading && (
          <ResultsDisplay result={result} onReset={handleReset} />
        )}
      </div>
    </main>
  );
}
