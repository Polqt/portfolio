'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import { SITE } from '@/data/site';
import PaTicker from '@/components/PaTicker';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/notes' },
];

export default function TerminalNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [belts, setBelts] = useState(false);
  const beltsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(
    () => () => {
      clearTimeout(beltsTimer.current);
      document.body.classList.remove('turbulence');
    },
    [],
  );

  const fastenBelts = () => {
    if (belts || reduce) return;
    setBelts(true);
    document.body.classList.add('turbulence');
    beltsTimer.current = setTimeout(() => {
      document.body.classList.remove('turbulence');
      setBelts(false);
    }, 3600);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
        >
          Hidalgo
          <span className="ml-1.5 text-primary">Intl</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {LINKS.map(link => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={SITE.cvPath}
            download
            className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            CV
          </a>
          <button
            type="button"
            onClick={fastenBelts}
            title="Fasten seatbelts"
            className={`hidden rounded-sm border px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors md:inline ${
              belts
                ? 'border-primary bg-primary/15 text-primary motion-safe:animate-pulse'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            }`}
          >
            Belts
          </button>
        </nav>
      </div>
      <PaTicker />
    </header>
  );
}
