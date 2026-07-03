'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const FLIP_EVERY_MS = 45;
const SETTLE_BASE_MS = 250;
const SETTLE_PER_CHAR_MS = 55;

type FlapTextProps = {
  text: string;
  className?: string;
  /** offsets the settle stagger so rows finish at different times */
  startIndex?: number;
  /** bump this value to re-run the flip cycle (e.g. on row hover) */
  flipKey?: number;
};

/**
 * Solari-style split-flap text: characters cycle through the alphabet and
 * settle left to right. One rAF loop per instance, honors reduced motion.
 */
export default function FlapText({
  text,
  className = '',
  startIndex = 0,
  flipKey = 0,
}: FlapTextProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    let cycleStart: number | null = null;

    const run = (ts: number) => {
      if (cycleStart === null) cycleStart = ts;
      const t = ts - cycleStart;
      let settled = true;

      const out = text
        .split('')
        .map((ch, i) => {
          if (!CHARS.includes(ch.toUpperCase())) return ch;
          const settleAt =
            SETTLE_BASE_MS + (startIndex + i) * SETTLE_PER_CHAR_MS;
          if (t >= settleAt) return ch;
          settled = false;
          return CHARS[Math.floor(t / FLIP_EVERY_MS + i * 1.7) % CHARS.length];
        })
        .join('');

      setDisplay(out);
      if (!settled) frameRef.current = requestAnimationFrame(run);
    };

    frameRef.current = requestAnimationFrame(run);

    return () => cancelAnimationFrame(frameRef.current);
  }, [text, reduce, startIndex, flipKey]);

  return (
    <span className={`whitespace-pre ${className}`} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
