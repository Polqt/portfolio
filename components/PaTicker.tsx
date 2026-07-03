'use client';

import { useEffect, useState } from 'react';
import { projects, SITE } from '@/data/site';
import type { HaikuData } from '@/types';

export default function PaTicker() {
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: SITE.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);

    // haiku API already resolves local weather; reuse it
    fetch('/api/haiku')
      .then(r => r.json())
      .then((data: HaikuData) => {
        if (data?.weather) setWeather(data.weather);
      })
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  const boarding = projects
    .filter(p => p.status !== 'completed')
    .map(p => `NOW BOARDING /// ${p.name}`);
  const departed = projects
    .filter(p => p.status === 'completed')
    .map(p => `DEPARTED /// ${p.name}`);

  const line = [
    ...boarding,
    'GATE /PROJECTS OPEN',
    ...departed,
    time && `LOCAL TIME ${time} PHT`,
    weather && `WEATHER SAGAY /// ${weather.toUpperCase()}`,
    'FINAL CALL /// HIRE THIS DEV',
    'ALL SYSTEMS NOMINAL',
  ]
    .filter(Boolean)
    .join('   ');

  return (
    <div className="ticker-wrap overflow-hidden border-t border-border bg-card">
      <div className="ticker flex gap-24 py-1.5 pr-24">
        <span className="plaque whitespace-nowrap text-primary/90">{line}</span>
        <span aria-hidden className="plaque whitespace-nowrap text-primary/90">
          {line}
        </span>
      </div>
    </div>
  );
}
