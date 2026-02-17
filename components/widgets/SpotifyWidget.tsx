'use client';

import { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import type { SpotifyTrack } from '@/types';

/**
 * Spotify Now-Playing Widget
 *
 * To integrate with the Spotify API:
 * 1. Create app at https://developer.spotify.com/dashboard
 * 2. Add /api/spotify/now-playing route with refresh token flow
 * 3. Uncomment the fetch call below
 *
 * See: https://leerob.io/blog/spotify-api-nextjs
 */

export default function SpotifyWidget() {
  const [track] = useState<SpotifyTrack | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // TODO: Replace with real Spotify API call
    // async function fetchNowPlaying() {
    //   try {
    //     const res = await fetch('/api/spotify/now-playing');
    //     if (res.ok) setTrack(await res.json());
    //   } catch { /* silently fail */ }
    // }
    // fetchNowPlaying();
    // const interval = setInterval(fetchNowPlaying, 30000);
    // return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const progressPercent = track ? (track.progress / track.duration) * 100 : 0;

  return (
    <div className="bento-item group h-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-[#1DB954]"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">
            Spotify
          </span>
        </div>
        {track?.isPlaying && (
          <div className="flex gap-0.5 items-end h-3 ml-auto">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-0.5 bg-[#1DB954] rounded-full"
                style={{
                  height: `${Math.random() * 100}%`,
                  animation: `equalizer 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {track ? (
        <div className="flex-1 flex flex-col justify-end">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground truncate leading-tight">
              {track.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {track.artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1DB954] transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <Music className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Not playing</p>
        </div>
      )}
    </div>
  );
}
