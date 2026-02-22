'use client';

import { MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SITE } from '@/data/site';
import { GeoLocation } from '@/types';

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
      const tz = liveLocation?.timezone ?? SITE.timezone;
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const flag = '🇵🇭';
  const tzAbbr = liveLocation?.timezone
    ? (new Intl.DateTimeFormat('en', {
        timeZone: liveLocation.timezone,
        timeZoneName: 'short',
      })
        .formatToParts(new Date())
        .find(p => p.type === 'timeZoneName')?.value ?? 'PHT')
    : 'PHT';

  const mapLat = SITE.lat;
  const mapLon = SITE.lon;
  const offset = 0.04;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLon - offset},${mapLat - offset},${mapLon + offset},${mapLat + offset}&layer=mapnik&marker=${mapLat},${mapLon}`;

  return (
    <div className="bento-item group h-full flex flex-col justify-between overflow-hidden relative !p-0">
      <iframe
        src={mapSrc}
        title="location map"
        scrolling="no"
        className="absolute inset-0 w-full h-full rounded-2xl opacity-60 dark:opacity-40 pointer-events-none"
        style={{ border: 'none', colorScheme: 'normal' }}
      />

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-card/95 via-card/70 to-card/40 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="h-3.5 w-3.5 text-poke-fire" />
            <span className="text-xs font-medium text-muted-foreground">
              Location
            </span>
          </div>

          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground">{city}</p>
            <p className="text-xs text-muted-foreground">
              {region} {flag}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">
            {time} {tzAbbr}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-500 font-medium">
              {SITE.available ? 'Available' : 'Busy'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
