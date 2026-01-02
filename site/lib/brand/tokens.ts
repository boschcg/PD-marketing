/**
 * Brand design tokens for Profitdrive
 * Aligned with app UI branding
 */

export const BRAND_BLUE = '#3730A3';
export const BRAND_GREEN = '#56D384';

export const brandTokens = {
  // Primary brand color (blue)
  primary: BRAND_BLUE,
  
  // Accent color (green)
  accent: BRAND_GREEN,
  
  // Text colors
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6b7280',
  },
  
  // Background colors
  background: {
    white: '#ffffff',
    offWhite: '#f9fafb',
    gray: '#f3f4f6',
  },
  
  // Border colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
  },
} as const;

/**
 * Get brand color by key
 */
export function getBrandColor(key: keyof typeof brandTokens): string {
  return brandTokens[key] as string;
}

