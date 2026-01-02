'use client';

import { useEffect } from 'react';

/**
 * Client component that conditionally injects dev-only CSS
 * Hides Next.js DevTools overlay in development
 */
export default function DevOverrides() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const style = document.createElement('style');
      style.id = 'dev-overrides';
      style.textContent = `
        /* Hide Next.js DevTools launcher - multiple selectors for robustness */
        [data-nextjs-toast],
        [data-nextjs-toast] > *,
        div[data-nextjs-toast],
        button[data-nextjs-toast] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* Hide any element with Next.js devtools-related attributes */
        [data-nextjs-portal],
        [data-nextjs-dialog] {
          display: none !important;
        }
        
        /* Hide the floating "N" button specifically */
        body > div[style*="position: fixed"][style*="bottom"] button,
        body > div[style*="position: fixed"][style*="bottom"] a {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        const existing = document.getElementById('dev-overrides');
        if (existing) {
          document.head.removeChild(existing);
        }
      };
    }
  }, []);

  return null;
}

