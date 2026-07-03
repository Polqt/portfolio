'use client';

import { useState, useEffect } from 'react';
import type { HaikuData } from '@/types';

export default function HaikuWidget() {
  const [haiku, setHaiku] = useState<HaikuData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/haiku')
      .then(r => r.json())
      .then((data: HaikuData) => {
        setHaiku(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center py-1">
        {loading ? (
          <div className="space-y-2.5">
            {[80, 100, 70].map((w, i) => (
              <div
                key={i}
                className="h-3 animate-pulse bg-muted"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        ) : haiku ? (
          <div className="space-y-2">
            {haiku.lines.map((line, i) => (
              <p
                key={i}
                className="text-[15px] italic leading-relaxed text-foreground/90"
              >
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            words arrive later
          </p>
        )}
      </div>

      {haiku && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-2.5">
          {[haiku.weather, haiku.timeOfDay, haiku.moonPhase, haiku.emotion].map(
            tag => (
              <span key={tag} className="plaque">
                {tag}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}
