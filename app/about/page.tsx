'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import ExperienceSection from '@/components/ExperienceSection';
import Dock from '@/components/Dock';
import Skills from '@/components/Skills';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lon: number;
    timezone: string;
    tzAbbr: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data.latitude) {
          const tz = data.timezone || SITE.timezone;
          const tzAbbr =
            new Intl.DateTimeFormat('en', {
              timeZone: tz,
              timeZoneName: 'short',
            })
              .formatToParts(new Date())
              .find(p => p.type === 'timeZoneName')?.value ?? 'PHT';
          setLiveLocation({
            lat: data.latitude,
            lon: data.longitude,
            timezone: tz,
            tzAbbr,
          });
        }
      })
      .catch(() => {});

    const updateTime = (tz: string = SITE.timezone) => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(() => updateTime(), 60000);
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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div
          className={`w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="h-36 sm:h-44 relative overflow-hidden">
              {/* Always show Sagay City on the map — IP geolocation is inaccurate */}
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${SITE.lon - 0.04},${SITE.lat - 0.04},${SITE.lon + 0.04},${SITE.lat + 0.04}&layer=mapnik&marker=${SITE.lat},${SITE.lon}`}
                title="location map"
                scrolling="no"
                className="absolute inset-0 w-full h-full opacity-70 dark:opacity-50 pointer-events-none"
                style={{ border: 'none', colorScheme: 'normal' }}
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-card/10 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 bg-background/40 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-[11px] font-medium text-foreground/90">
                      {SITE.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-background/40 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[11px] font-mono text-foreground/90">
                      {time} {liveLocation?.tzAbbr ?? 'PHT'}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-400">
                      {SITE.available ? 'Available for work' : 'Busy'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/60">
                    {`${SITE.lat.toFixed(1)}°N ${SITE.lon.toFixed(1)}°E`}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 -mt-14 sm:-mt-16 relative z-10">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-sm" />
                <Image
                  src="/Hidalgo.png"
                  alt={SITE.name}
                  width={96}
                  height={96}
                  className="relative rounded-2xl w-24 h-24 sm:w-28 sm:h-28 object-cover border-4 border-card"
                  priority
                />
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-card bg-emerald-500" />
              </div>
            </div>

            <div className="px-6 sm:px-8 pt-4 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                      {SITE.name}
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {SITE.role}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {SITE.bio}
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {SITE.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Since 2022
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">
              Skills
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          <section>
            <h2 className="text-xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-primary" />
              Tech Stack
            </h2>
            <Skills />
          </section>

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-border/50" />
            <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-widest">
              Experience
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>

          <section>
            <h2 className="text-xl font-bold text-foreground tracking-tight mb-6 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-poke-fire" />
              Summary
            </h2>
            <ExperienceSection />
          </section>
        </div>
      </div>

      <Dock />
    </div>
  );
}
