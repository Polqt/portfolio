'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { SITE } from '@/data/site';
import Dock from '@/components/Dock';
import HaikuWidget from '@/components/widgets/HaikuWidget';
import LocationWidget from '@/components/widgets/LocationWidget';
import TechStackWidget from '@/components/widgets/TechStackWidget';
import GitHubWidget from '@/components/widgets/GitHubWidget';
import SpotifyWidget from '@/components/widgets/SpotifyWidget';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-3 sm:gap-4 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* ─── Row 1: Hero · Haiku · Location ─── */}

            <div className="sm:col-span-2 bento-item relative overflow-hidden">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-sm opacity-60" />
                  <Image
                    src="/Hidalgo.png"
                    alt={SITE.name}
                    width={80}
                    height={80}
                    className="relative rounded-2xl w-16 h-16 sm:w-20 sm:h-20 object-cover"
                    priority
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {SITE.name}
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {SITE.role}
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-md">
                    Filipino developer building things that matter. Exploring
                    AI, real-time systems, and the craft of modern software —
                    one commit at a time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30">
                <Link
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <IconBrandGithub className="h-3.5 w-3.5" />
                  GitHub
                </Link>
                <Link
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <IconBrandLinkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors ml-auto"
                >
                  About me
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="sm:col-span-1">
              <HaikuWidget />
            </div>

            <div className="sm:col-span-1">
              <LocationWidget />
            </div>

            <div className="sm:col-span-1">
              <SpotifyWidget />
            </div>

            <div className="sm:col-span-1">
              <GitHubWidget />
            </div>

            <div className="sm:col-span-2">
              <TechStackWidget />
            </div>
          </div>
        </div>
      </div>

      <Dock />
    </div>
  );
}
