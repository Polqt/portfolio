'use client';

import { useEffect } from 'react';

/**
 * Tab leaves -> title becomes a gate-closing call. Tab returns -> brief
 * welcome, then the original title is restored. Renders nothing.
 */
export default function TabTitleGimmick() {
  useEffect(() => {
    let original = document.title;
    let restoreTimer: ReturnType<typeof setTimeout> | undefined;

    const onVisibility = () => {
      if (document.hidden) {
        original = document.title;
        document.title = '✈ GATE CLOSING · COME BACK';
      } else {
        document.title = 'WELCOME BACK ABOARD';
        clearTimeout(restoreTimer);
        restoreTimer = setTimeout(() => {
          document.title = original;
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(restoreTimer);
    };
  }, []);

  return null;
}
