'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SpotifyData } from '@/types';

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchTrack() {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (res.ok) setData(await res.json());
      } catch {}
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const progressPercent =
    data?.progress && data?.duration
      ? (data.progress / data.duration) * 100
      : 0;

  return (
    <div className="bento-item group h-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 text-[#1DB954]"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">
            Spotify
          </span>
        </div>

        {data?.isPlaying ? (
          <div className="flex gap-0.5 items-end h-3">
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
              <div
                key={i}
                className="w-0.5 bg-[#1DB954] rounded-full animate-pulse"
                style={{
                  height: `${60 + i * 10}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>
        ) : data?.name ? (
          <span className="text-[10px] text-muted-foreground/60">
            recently played
          </span>
        ) : null}
      </div>

      {data?.name ? (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/track flex-1"
        >
          {data.albumArt ? (
            <div className="relative flex-shrink-0">
              <Image
                src={data.albumArt}
                alt={data.album ?? ''}
                width={52}
                height={52}
                className="rounded-lg object-cover w-13 h-13 shadow-md group-hover/track:opacity-80 transition-opacity"
              />
              {data.isPlaying && (
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#1DB954] border-2 border-card" />
              )}
            </div>
          ) : (
            <div className="flex-shrink-0 w-13 h-13 rounded-lg bg-muted flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[#1DB954]/60"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate leading-tight group-hover/track:text-[#1DB954] transition-colors">
              {data.name}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {data.artist}
            </p>
          </div>
        </a>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-muted-foreground/40"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <p className="text-xs text-muted-foreground">Not playing</p>
        </div>
      )}

      {data?.isPlaying && data.duration ? (
        <div className="mt-3 w-full h-0.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1DB954] transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
