'use client';

import { useState, useEffect } from 'react';
import { Feather } from 'lucide-react';

interface HaikuData {
  lines: string[];
  weather: string;
  timeOfDay: string;
  commit: string;
  generated: boolean;
  date: string;
}

export default function HaikuWidget() {
  const [haiku, setHaiku] = useState<HaikuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/haiku')
      .then(r => r.json())
      .then((data: HaikuData) => {
        setHaiku(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <div className="bento-item h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Feather className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">
            Daily Haiku
          </span>
        </div>
        {haiku?.generated && (
          <span className="text-[9px] text-accent/50 font-medium tracking-wide">
            ai · today
          </span>
        )}
      </div>

      {/* Haiku lines */}
      <div className="flex-1 flex flex-col justify-center py-1">
        {loading ? (
          <div className="space-y-2.5">
            {[80, 100, 70].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-muted/40 animate-pulse"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        ) : haiku ? (
          <div className="space-y-2">
            {haiku.lines.map((line, i) => (
              <p
                key={i}
                className="text-[13px] text-foreground/90 italic leading-relaxed tracking-wide"
                style={{ opacity: 1 - i * 0.1 }}
              >
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            words arrive later
          </p>
        )}
      </div>

      {/* Signals footer */}
      {haiku && (
        <div className="mt-3 pt-2 border-t border-border/30 flex items-center gap-1.5 flex-wrap">
          {[haiku.weather, haiku.timeOfDay].map(tag => (
            <span
              key={tag}
              className="inline-flex rounded-md bg-accent/10 px-1.5 py-0.5 text-[9px] font-medium text-accent/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
