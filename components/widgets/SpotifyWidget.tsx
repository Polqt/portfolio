'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SpotifyData, SpotifyTrack } from '@/types';

const Equalizer = () => (
  <div className="flex h-3 items-end gap-[2px]">
    {[0, 0.2, 0.1, 0.3].map((delay, i) => (
      <span
        key={i}
        className="w-[2px] bg-primary"
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
        className="flex-shrink-0 border border-border object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center border border-border bg-muted"
      style={{ width: size, height: size }}
    >
      <span className="plaque">n/a</span>
    </div>
  );
}

function RecentTrack({ track }: { track: SpotifyTrack }) {
  return (
    <a
      href={track.songUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group/rt -mx-1 flex min-w-0 items-center gap-2.5 px-1 py-1.5 transition-colors hover:bg-muted/60"
    >
      <AlbumArt
        src={track.albumArt}
        alt={track.album ?? track.name}
        size={32}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs leading-tight text-foreground/85 transition-colors group-hover/rt:text-foreground">
          {track.name}
        </p>
        <p className="mt-0.5 truncate text-[10.5px] text-muted-foreground">
          {track.artist}
        </p>
      </div>
    </a>
  );
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (res.ok) setData(await res.json());
      } catch {
      } finally {
        setLoading(false);
      }
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full animate-pulse flex-col gap-3">
        <div className="flex gap-3">
          <div className="h-14 w-14 flex-shrink-0 bg-muted" />
          <div className="flex flex-1 flex-col gap-2 pt-1">
            <div className="h-3.5 w-3/4 bg-muted" />
            <div className="h-3 w-1/2 bg-muted" />
          </div>
        </div>
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="h-8 w-8 flex-shrink-0 bg-muted" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-2.5 w-3/4 bg-muted" />
              <div className="h-2 w-1/2 bg-muted" />
            </div>
          </div>
        ))}
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
    <div className="flex h-full flex-col gap-3">
      {current ? (
        <a
          href={current.songUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group/hero flex items-center gap-3"
        >
          <AlbumArt
            src={current.albumArt}
            alt={current.album ?? current.name}
            size={52}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm leading-tight text-foreground transition-colors group-hover/hero:text-primary">
                {current.name}
              </p>
              {current.isPlaying && <Equalizer />}
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {current.artist}
            </p>
            {current.isPlaying && current.duration ? (
              <div className="mt-2 h-px w-full bg-border">
                <div
                  className="h-px bg-primary transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            ) : (
              <p className="plaque mt-1">recently played</p>
            )}
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-2.5 py-1">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-border bg-muted">
            <span className="plaque">off</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Nothing playing right now
          </p>
        </div>
      )}

      {recentTracks.length > 0 && (
        <div className="mt-auto border-t border-border pt-2">
          <p className="plaque mb-1">Recently played</p>
          <div className="flex flex-col">
            {recentTracks.slice(0, 2).map((track, i) => (
              <RecentTrack key={i} track={track} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
