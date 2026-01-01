/**
 * UTM parameter capture and storage
 * Stores first-touch UTMs for attribution
 */

const UTM_STORAGE_KEY = 'pd_utm_params';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Extract UTM parameters from URL
 */
export function extractUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  const utmKeys: Array<keyof UTMParams> = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  let hasUTM = false;
  for (const key of utmKeys) {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
      hasUTM = true;
    }
  }

  return hasUTM ? utmParams : null;
}

/**
 * Store UTM parameters (first-touch only)
 */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;

  // Only store if we don't already have UTMs stored
  const existing = getStoredUTMParams();
  if (existing) return;

  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  } catch {
    // localStorage might not be available, ignore
  }
}

/**
 * Get stored UTM parameters
 */
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UTMParams;
  } catch {
    return null;
  }
}

/**
 * Capture and store UTM parameters on page load
 */
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;

  const params = extractUTMParams();
  if (params) {
    storeUTMParams(params);
  }
}

