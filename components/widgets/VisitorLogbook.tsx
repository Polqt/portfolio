'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { LogbookEntry } from '@/lib/logbook';

const STAMPS = [
  'Smooth landing',
  'Hire this dev',
  'Frequent flyer',
  'Came for the haiku',
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function VisitorLogbook() {
  const reduce = useReducedMotion();
  const [entries, setEntries] = useState<LogbookEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [stamp, setStamp] = useState(STAMPS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/logbook')
      .then(r => r.json())
      .then((data: { entries: LogbookEntry[]; total: number }) => {
        setEntries(data.entries ?? []);
        setTotal(data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || !name.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/logbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), stamp }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? 'Something went wrong.');
        return;
      }
      setEntries(prev =>
        [{ name: name.trim(), stamp, ts: Date.now() }, ...prev].slice(0, 12),
      );
      setTotal(t => t + 1);
      setSigned(true);
      setName('');
    } catch {
      setError('The manifest is unavailable right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="vitrine">
      <div className="flex items-baseline justify-between border-b border-border px-4 py-2.5 sm:px-5">
        <span className="plaque text-primary">Passenger manifest</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
          {total > 0 ? `${total} aboard` : 'open'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-2 md:gap-10">
        {/* ─── Check in ─── */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Check in before you go
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Leave your name and a stamp on the manifest. No boarding pass
            required.
          </p>

          {signed ? (
            <motion.div
              initial={
                reduce ? false : { scale: 1.8, opacity: 0, rotate: -18 }
              }
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
              className="mt-6 inline-block rounded-sm border-2 border-primary px-4 py-2.5"
            >
              <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Checked in
              </span>
              <span className="plaque mt-0.5 block text-primary/80">
                Hidalgo Intl · Safe travels
              </span>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="logbook-name" className="plaque block">
                  Your name
                </label>
                <input
                  id="logbook-name"
                  type="text"
                  value={name}
                  maxLength={24}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ana Reyes"
                  className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <span className="plaque block">Pick a stamp</span>
                <div className="flex flex-wrap gap-2">
                  {STAMPS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStamp(s)}
                      className={`rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                        stamp === s
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !name.trim()}
                className="rounded-sm border border-primary bg-primary px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? 'Checking in' : 'Check in'}
              </button>
            </form>
          )}
        </div>

        {/* ─── Recent passengers ─── */}
        <div className="border-t border-border pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="plaque mb-4">Recently aboard</p>
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-4 w-3/4 animate-pulse bg-muted" />
              ))}
            </div>
          ) : entries.length ? (
            <ul className="divide-y divide-border">
              {entries.map((entry, i) => (
                <li
                  key={`${entry.ts}-${i}`}
                  className="flex items-baseline justify-between gap-3 py-2"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground">
                      {entry.name}
                    </span>
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-primary">
                      {entry.stamp}
                    </span>
                  </div>
                  <span className="flex-shrink-0 font-mono text-[10px] text-muted-foreground">
                    {formatDate(entry.ts)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              The manifest is empty. Be the first passenger.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
