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

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: SITE.timezone,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(new Date()),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-start">
        <div
          className={`w-full flex flex-col max-w-3xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 pb-24 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="h-32 sm:h-40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-poke-water/10" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 bg-background/30 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-[11px] font-medium text-foreground/90">
                      {SITE.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-background/30 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-border/20">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[11px] font-mono text-foreground/90">
                      {time} PHT
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
                  <span className="text-[10px] font-mono text-muted-foreground/40">
                    10.0°N 122.5°E
                  </span>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
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
