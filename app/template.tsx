'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Gate-change wipe on every route navigation: an amber signage strip sweeps
 * across while the incoming page fades in. Transform/opacity only.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 left-0 z-[65] w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-primary/70"
          initial={{ x: '-45vw' }}
          animate={{ x: '145vw' }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
        />
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
