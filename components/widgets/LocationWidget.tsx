'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { SITE } from '@/data/site';
import { GeoLocation } from '@/types';

const DarkMap = dynamic(() => import('./DarkMap'), { ssr: false });

export default function LocationWidget() {
  const [time, setTime] = useState('');
  const [liveLocation, setLiveLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.city) {
          setLiveLocation({
            city: data.city,
            region: data.region,
            country: data.country_name,
            flag: '',
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
    setTime(
      new Intl.DateTimeFormat('en-US', {
        timeZone: liveLocation.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()),
    );
  }, [liveLocation]);

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
    <div className="flex h-full flex-col">
      {/* isolate keeps leaflet's internal z-indexes from painting over the sticky nav */}
      <div className="relative isolate z-0 min-h-[150px] flex-1 overflow-hidden">
        <DarkMap
          lat={SITE.lat}
          lon={SITE.lon}
          zoom={13}
          className="absolute inset-0 h-full w-full"
        />
        {/* z above leaflet panes (max ~700), contained by the isolate wrapper */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[900] overflow-hidden"
        >
          <div className="radar-sweep" />
        </div>
      </div>

      <div className="flex items-baseline justify-between border-t border-border px-4 py-2.5 sm:px-5">
        <div>
          <p className="text-sm leading-tight text-foreground">{city}</p>
          <p className="mt-0.5 text-[10.5px] text-muted-foreground">
            {region}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-foreground">
            {time} {tzAbbr}
          </p>
          <p className="plaque mt-0.5">
            {SITE.available ? 'Open to work' : 'Heads down'}
          </p>
        </div>
      </div>
    </div>
  );
}
