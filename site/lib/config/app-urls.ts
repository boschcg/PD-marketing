/**
 * App URL configuration
 * Centralized configuration for external app URLs
 */

export function getAppLoginUrl(): string {
  return process.env.NEXT_PUBLIC_APP_LOGIN_URL || 'https://app.profitdrive.app/login';
}

export function getEarlyAccessUrl(locale: string): string {
  // Use environment variable if set, otherwise use internal route
  const envUrl = process.env.NEXT_PUBLIC_EARLY_ACCESS_URL;
  if (envUrl) {
    return envUrl;
  }
  return `/${locale}/early-access`;
}

