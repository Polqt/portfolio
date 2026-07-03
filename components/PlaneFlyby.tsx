'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { IconPlane } from '@tabler/icons-react';

/**
 * Once per page load: when the target section scrolls into view, a plane
 * crosses the screen diagonally with a fading contrail.
 */
export default function PlaneFlyby({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const [fly, setFly] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting) && !fired.current) {
          fired.current = true;
          setFly(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, targetId]);

  if (!fly) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55]"
      initial={{ x: '-12vw', y: '82vh', opacity: 0 }}
      animate={{ x: '108vw', y: '6vh', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, ease: 'easeInOut' }}
      onAnimationComplete={() => setFly(false)}
    >
      {/* container tilted to match the travel angle; trail points backwards */}
      <div className="relative -rotate-[30deg]">
        <IconPlane className="h-6 w-6 rotate-45 text-primary" />
        <span className="absolute right-full top-1/2 h-px w-28 bg-gradient-to-l from-primary/60 to-transparent" />
      </div>
    </motion.div>
  );
}
