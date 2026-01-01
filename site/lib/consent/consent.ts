/**
 * Consent management utilities
 * Stores consent choice with versioning for future policy updates
 */

const CONSENT_COOKIE_NAME = 'pd_consent_v1';
const CONSENT_VERSION = 'v1';

export type ConsentChoice = 'accepted' | 'declined' | null;

export interface ConsentData {
  choice: ConsentChoice;
  version: string;
  timestamp: number;
}

/**
 * Get consent choice from cookie
 */
export function getConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  
  if (!cookieValue) return null;
  
  try {
    const value = cookieValue.split('=')[1];
    const decoded = decodeURIComponent(value);
    const data: ConsentData = JSON.parse(decoded);
    
    // Validate version matches
    if (data.version !== CONSENT_VERSION) {
      return null; // Version mismatch, treat as no consent
    }
    
    return data;
  } catch {
    return null;
  }
}

/**
 * Set consent choice in cookie
 */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  
  const data: ConsentData = {
    choice,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };
  
  const cookieValue = encodeURIComponent(JSON.stringify(data));
  const maxAge = 365 * 24 * 60 * 60; // 1 year
  
  document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Check if analytics is consented
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.choice === 'accepted';
}

/**
 * Check if consent banner should be shown (no consent stored)
 */
export function shouldShowConsentBanner(): boolean {
  return getConsent() === null;
}

