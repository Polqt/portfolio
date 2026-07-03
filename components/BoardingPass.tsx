'use client';

import { useState, FormEvent } from 'react';
import FlapText from '@/components/FlapText';

const AMBER = '#ffb000';
const BONE = '#e6e1d5';
const MUTED = '#8f8a7e';
const CARD = '#1b1a17';
const BORDER = '#33312c';

function hashName(name: string) {
  let h = 7;
  for (const c of name.toUpperCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function seatFor(name: string) {
  const h = hashName(name);
  return `${(h % 30) + 1}${'ABCDEF'[h % 6]}`;
}

function todayStamp() {
  return new Date()
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
}

/** Deterministic barcode widths from the passenger name */
function barcodeBars(name: string) {
  const h = hashName(name);
  const bars: number[] = [];
  let seed = h;
  for (let i = 0; i < 40; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    bars.push((seed % 3) + 1);
  }
  return bars;
}

function drawPassPng(name: string) {
  const seat = seatFor(name);
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const mono = (size: number, weight = '') =>
    `${weight ? weight + ' ' : ''}${size}px 'Courier New', monospace`;

  ctx.fillStyle = CARD;
  ctx.fillRect(0, 0, 1000, 360);
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 998, 358);

  // header
  ctx.fillStyle = AMBER;
  ctx.font = mono(16, 'bold');
  ctx.fillText('HIDALGO INTL /// BOARDING PASS', 36, 48);
  ctx.strokeStyle = BORDER;
  ctx.beginPath();
  ctx.moveTo(0, 70);
  ctx.lineTo(1000, 70);
  ctx.stroke();

  // passenger
  ctx.fillStyle = MUTED;
  ctx.font = mono(13);
  ctx.fillText('PASSENGER', 36, 120);
  ctx.fillStyle = BONE;
  ctx.font = mono(34, 'bold');
  ctx.fillText(name.toUpperCase(), 36, 160);

  const fields: [string, string][] = [
    ['FLIGHT', `JH-${new Date().getFullYear()}`],
    ['GATE', 'DEV'],
    ['DATE', todayStamp()],
    ['STATUS', 'CLEARED'],
  ];
  fields.forEach(([label, value], i) => {
    const x = 36 + i * 160;
    ctx.fillStyle = MUTED;
    ctx.font = mono(12);
    ctx.fillText(label, x, 230);
    ctx.fillStyle = BONE;
    ctx.font = mono(18, 'bold');
    ctx.fillText(value, x, 258);
  });

  ctx.fillStyle = MUTED;
  ctx.font = mono(12);
  ctx.fillText('ISSUED AT JANPOLHIDALGO PORTFOLIO', 36, 322);

  // perforation
  ctx.strokeStyle = BORDER;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(720, 70);
  ctx.lineTo(720, 360);
  ctx.stroke();
  ctx.setLineDash([]);

  // stub
  ctx.fillStyle = MUTED;
  ctx.font = mono(12);
  ctx.fillText('SEAT', 760, 120);
  ctx.fillStyle = AMBER;
  ctx.font = mono(44, 'bold');
  ctx.fillText(seat, 760, 170);

  ctx.fillStyle = BONE;
  let x = 760;
  for (const w of barcodeBars(name)) {
    ctx.fillRect(x, 230, w, 70);
    x += w + 3;
    if (x > 960) break;
  }

  const a = document.createElement('a');
  a.download = `boarding-pass-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

export default function BoardingPass() {
  const [name, setName] = useState('');
  const [issued, setIssued] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = name.trim().slice(0, 20);
    if (clean) setIssued(clean);
  };

  return (
    <section className="vitrine">
      <div className="flex items-baseline justify-between border-b border-border px-4 py-2.5 sm:px-5">
        <span className="plaque text-primary">Boarding pass printer</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
          free of charge
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {!issued ? (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-2">
              <label htmlFor="pass-name" className="plaque block">
                Passenger name
              </label>
              <input
                id="pass-name"
                type="text"
                value={name}
                maxLength={20}
                onChange={e => setName(e.target.value)}
                placeholder="Ana Reyes"
                className="w-full rounded-sm border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-sm border border-primary bg-primary px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
            >
              Print pass
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col overflow-hidden rounded-sm border border-border bg-background sm:flex-row">
              {/* pass body */}
              <div className="flex-1 p-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Hidalgo Intl /// Boarding pass
                </p>
                <p className="plaque mt-4">Passenger</p>
                <p className="mt-1 font-mono text-2xl font-semibold uppercase tracking-[0.06em] text-foreground">
                  <FlapText text={issued} />
                </p>
                <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  {[
                    ['Flight', `JH-${new Date().getFullYear()}`],
                    ['Gate', 'DEV'],
                    ['Date', todayStamp()],
                    ['Status', 'CLEARED'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="plaque">{label}</p>
                      <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* stub */}
              <div className="flex items-end justify-between gap-4 border-t border-dashed border-border p-5 sm:w-44 sm:flex-col sm:items-start sm:border-l sm:border-t-0">
                <div>
                  <p className="plaque">Seat</p>
                  <p className="mt-1 font-mono text-3xl font-semibold text-primary">
                    <FlapText text={seatFor(issued)} startIndex={4} />
                  </p>
                </div>
                <div className="barcode h-9 w-24 text-foreground/60 sm:w-full" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => drawPassPng(issued)}
                className="rounded-sm border border-primary bg-primary px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary active:translate-y-px"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => setIssued('')}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                New passenger
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
