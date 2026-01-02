/**
 * Analytics abstraction layer
 * Provider-agnostic interface for tracking
 */

export type AnalyticsProvider = 'plausible' | 'posthog' | 'none';

export interface AnalyticsConfig {
  provider: AnalyticsProvider;
  key?: string;
  enabled: boolean;
}

/**
 * Get analytics configuration from environment
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as AnalyticsProvider) ?? 'none';
  const key = process.env.NEXT_PUBLIC_ANALYTICS_KEY;
  const enabled = provider !== 'none' && !!key;

  return {
    provider,
    key,
    enabled,
  };
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const config = getAnalyticsConfig();
  if (!config.enabled) return;

  switch (config.provider) {
    case 'plausible':
      // Plausible automatically tracks page views via script
      // But we can manually trigger for SPA navigation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).plausible) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).plausible('pageview', {
          url: path,
        });
      }
      break;
    case 'posthog':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).posthog) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).posthog.capture('$pageview', {
          $current_url: path,
          title,
        });
      }
      break;
    case 'none':
    default:
      // No-op
      break;
  }
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  const config = getAnalyticsConfig();
  if (!config.enabled) return;

  switch (config.provider) {
    case 'plausible':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).plausible) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).plausible(eventName, { props: properties });
      }
      break;
    case 'posthog':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).posthog) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).posthog.capture(eventName, properties);
      }
      break;
    case 'none':
    default:
      // No-op
      break;
  }
}

/**
 * Initialize analytics provider script
 * Only called after consent is given
 */
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') return;

  const config = getAnalyticsConfig();
  if (!config.enabled || !config.key) return;

  switch (config.provider) {
    case 'plausible':
      // Plausible script loading
      const plausibleScript = document.createElement('script');
      plausibleScript.defer = true;
      plausibleScript.setAttribute('data-domain', config.key);
      plausibleScript.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(plausibleScript);
      break;
    case 'posthog':
      // PostHog script loading
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).posthog && config.key) {
        const posthogScript = document.createElement('script');
        posthogScript.async = true;
        posthogScript.src = `https://us.i.posthog.com/dist/array.js`;
        document.head.appendChild(posthogScript);
        
        posthogScript.onload = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((window as any).posthog) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).posthog.init(config.key, {
              api_host: 'https://us.i.posthog.com',
            });
          }
        };
      }
      break;
    case 'none':
    default:
      // No-op
      break;
  }
}

