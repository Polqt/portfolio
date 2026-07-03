'use client';

import { useLayoutEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const KEY = 'hidalgo-takeoff-done';

/**
 * First-visit-only boot screen: runway edge lights sweep, then the overlay
 * lifts. Rendered in SSR HTML so there is no page flash before it appears;
 * repeat visitors get it removed before first paint via useLayoutEffect.
 */
export default function TakeoffIntro() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>('show');

  useLayoutEffect(() => {
    if (reduce || sessionStorage.getItem(KEY)) {
      setPhase('done');
      return;
    }
    sessionStorage.setItem(KEY, '1');
    const t = setTimeout(() => setPhase('exit'), 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  if (phase === 'done') return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-background"
      animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (phase === 'exit') setPhase('done');
      }}
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="h-1.5 w-5 rounded-full bg-primary sm:w-6"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 1, 0.3] }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
          />
        ))}
      </div>
      <span className="plaque text-primary">
        Hidalgo Intl · cleared for takeoff
      </span>
    </motion.div>
  );
}
