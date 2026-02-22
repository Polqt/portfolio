'use client';

import dynamic from 'next/dynamic';
import { MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SITE } from '@/data/site';
import { GeoLocation } from '@/types';

const DarkMap = dynamic(() => import('./DarkMap'), { ssr: false });

export default function LocationWidget() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [liveLocation, setLiveLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    setMounted(true);

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.city) {
          setLiveLocation({
            city: data.city,
            region: data.region,
            country: data.country_name,
            flag: data.country_code
              ? String.fromCodePoint(
                  ...data.country_code
                    .toUpperCase()
                    .split('')
                    .map((c: string) => 0x1f1e0 + c.charCodeAt(0) - 65),
                )
              : '�',
            timezone: data.timezone || SITE.timezone,
            lat: data.latitude,
            lon: data.longitude,
          });
        }
      })
      .catch(() => {});

    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: SITE.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!liveLocation?.timezone) return;
    const now = new Date();
    setTime(
      new Intl.DateTimeFormat('en-US', {
        timeZone: liveLocation.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now),
    );
  }, [liveLocation]);

  if (!mounted) return null;

  const city = SITE.location.split(',')[0];
  const region = SITE.location.split(',').slice(1).join(',').trim();
  const tzAbbr = liveLocation?.timezone
    ? (new Intl.DateTimeFormat('en', {
        timeZone: liveLocation.timezone,
        timeZoneName: 'short',
      })
        .formatToParts(new Date())
        .find(p => p.type === 'timeZoneName')?.value ?? 'PHT')
    : 'PHT';

  return (
    <div className="bento-item group h-full overflow-hidden relative !p-0 min-h-[200px]">
      <DarkMap
        lat={SITE.lat}
        lon={SITE.lon}
        zoom={13}
        className="absolute inset-0 w-full h-full rounded-2xl"
      />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none z-[1001]" />

      <div className="absolute top-3 right-3 z-[1002] flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-white/10">
        <Clock className="h-3 w-3 text-white/70" />
        <span className="text-[11px] font-mono text-white/90 tracking-wide">
          {time} {tzAbbr}
        </span>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-[1002] flex items-end justify-between p-3.5">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-white/80 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              {city}
            </p>
            <p className="text-[10px] text-white/60">{region}</p>
          </div>
        </div>

        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-medium">
            {SITE.available ? 'Available' : 'Busy'}
          </span>
        </span>
      </div>
    </div>
  );
}
