'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { hasAnalyticsConsent } from '@/lib/consent/consent';
import { getAnalyticsConfig, initializeAnalytics, trackPageView } from '@/lib/analytics';
import { captureUTMParams } from '@/lib/analytics/utm';

/**
 * Analytics provider component
 * Handles initialization and page view tracking
 * Only active when consent is given
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Early return if analytics is disabled
    const config = getAnalyticsConfig();
    if (!config.enabled) {
      return;
    }

    // Capture UTM parameters on mount (before consent check)
    captureUTMParams();

    // Only proceed if consent is given
    if (!hasAnalyticsConsent()) {
      return;
    }

    // Initialize analytics provider script (only once)
    initializeAnalytics();

    // Track page view on route change
    // Small delay to ensure script is loaded
    const timeoutId = setTimeout(() => {
      trackPageView(pathname);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // This component doesn't render anything
  return null;
}


