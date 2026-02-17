'use client';

import { MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SITE } from '@/data/site';

export default function LocationWidget() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const phTime = new Intl.DateTimeFormat('en-US', {
        timeZone: SITE.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTime(phTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bento-item group h-full flex flex-col justify-between overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-gradient-to-br from-poke-water/30 to-poke-grass/30 rounded-2xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="h-3.5 w-3.5 text-poke-fire" />
          <span className="text-xs font-medium text-muted-foreground">
            Location
          </span>
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-foreground">
            {SITE.location.split(',')[0]}
          </p>
          <p className="text-xs text-muted-foreground">
            {SITE.location.split(',').slice(1).join(',').trim()} 🇵🇭
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 mt-3">
        <Clock className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">
          {time} PHT
        </span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-medium">
            {SITE.available ? 'Available' : 'Busy'}
          </span>
        </span>
      </div>
    </div>
  );
}
