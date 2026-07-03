import Link from 'next/link';
import { IconLuggage } from '@tabler/icons-react';
import TerminalNav from '@/components/TerminalNav';
import FlapText from '@/components/FlapText';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <TerminalNav />

      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <p className="plaque text-primary">Baggage claim</p>
        <h1 className="mt-4 font-mono text-6xl font-semibold text-foreground">
          <FlapText text="404" />
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          This gate does not exist. Your baggage may have boarded a different
          flight.
        </p>

        {/* lone suitcase on the carousel */}
        <div className="relative mt-10 w-full max-w-sm overflow-hidden border-y border-border py-4">
          <IconLuggage className="belt-item h-8 w-8 text-primary" />
        </div>

        <Link
          href="/"
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
        >
          Return to terminal
        </Link>
      </main>
    </div>
  );
}
