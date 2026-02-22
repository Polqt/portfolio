'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SpotifyData, SpotifyTrack } from '@/types';

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const Equalizer = () => (
  <div className="flex gap-[2px] items-end h-3.5">
    {[0, 0.2, 0.1, 0.3].map((delay, i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-[#1DB954]"
        style={{
          height: `${50 + ((i * 17) % 50)}%`,
          animation: `equalizerBounce 0.8s ease-in-out ${delay}s infinite alternate`,
        }}
      />
    ))}
  </div>
);

function AlbumArt({
  src,
  alt,
  size,
}: {
  src?: string;
  alt: string;
  size: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-md object-cover shadow-md flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-md bg-muted flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <SpotifyIcon className="h-4 w-4 text-[#1DB954]/50" />
    </div>
  );
}

function RecentTrack({ track, index }: { track: SpotifyTrack; index: number }) {
  return (
    <a
      href={track.songUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 group/rt min-w-0 py-1.5 rounded-md hover:bg-muted/40 transition-colors px-1 -mx-1"
    >
      <span className="text-[10px] text-muted-foreground/40 w-3 text-right flex-shrink-0 tabular-nums">
        {index + 1}
      </span>
      <AlbumArt
        src={track.albumArt}
        alt={track.album ?? track.name}
        size={36}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground/80 group-hover/rt:text-foreground truncate leading-tight transition-colors">
          {track.name}
        </p>
        <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5">
          {track.artist}
        </p>
      </div>
    </a>
  );
}

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

  if (!mounted) {
    return (
      <div className="bento-item h-full flex flex-col gap-3 animate-pulse">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <div className="h-3.5 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted mt-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[0, 1].map(i => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-3 h-2 rounded bg-muted" />
              <div className="w-9 h-9 rounded-md bg-muted flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-2.5 w-3/4 rounded bg-muted" />
                <div className="h-2 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = data?.current ?? null;
  const recentTracks = data?.recentTracks ?? [];
  const progressPercent =
    current?.progress && current?.duration
      ? Math.min(100, (current.progress / current.duration) * 100)
      : 0;

  return (
    <div className="bento-item h-full flex flex-col gap-3 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <SpotifyIcon className="h-3.5 w-3.5 text-[#1DB954]" />
          <span className="text-xs font-medium text-muted-foreground">
            Spotify
          </span>
        </div>
        <div className="flex items-center gap-2">
          {current?.isPlaying ? (
            <>
              <span className="text-[10px] text-[#1DB954] font-medium tracking-wide uppercase">
                now playing
              </span>
              <Equalizer />
            </>
          ) : current ? (
            <span className="text-[10px] text-muted-foreground/60">
              recently played
            </span>
          ) : null}
        </div>
      </div>

      {/* Hero track */}
      {current ? (
        <a
          href={current.songUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/hero"
        >
          <div className="relative flex-shrink-0">
            <AlbumArt
              src={current.albumArt}
              alt={current.album ?? current.name}
              size={52}
            />
            {current.isPlaying && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#1DB954] border-2 border-card" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate leading-tight group-hover/hero:text-[#1DB954] transition-colors">
              {current.name}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {current.artist}
            </p>
            {current.album && (
              <p className="text-[10px] text-muted-foreground/50 truncate mt-0.5">
                {current.album}
              </p>
            )}
            {current.isPlaying && current.duration ? (
              <div className="mt-2 w-full h-[3px] rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1DB954] transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            ) : null}
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-2.5 py-1">
          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
            <SpotifyIcon className="h-4 w-4 text-muted-foreground/30" />
          </div>
          <p className="text-xs text-muted-foreground">Nothing playing</p>
        </div>
      )}

      {/* Recent tracks */}
      {recentTracks.length > 0 && (
        <div className="mt-auto">
          <p className="text-[10px] text-muted-foreground/50 mb-1 font-medium uppercase tracking-wider">
            Recently Played
          </p>
          <div className="flex flex-col gap-0.5">
            {recentTracks.slice(0, 2).map((track, i) => (
              <RecentTrack key={i} track={track} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
