import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';
import { BRAND_BLUE, BRAND_GREEN } from '@/lib/brand/tokens';

interface BrandWordmarkProps {
  locale: Locale;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  className?: string;
}

/**
 * Brand wordmark component - "Profitdrive" in brand blue + "//" in brand green
 * Matches app styling exactly
 */
export default function BrandWordmark({ 
  locale, 
  size = 'md', 
  asLink = false,
  className = '' 
}: BrandWordmarkProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
  };

  const content = (
    <span 
      className={`font-semibold no-underline flex items-baseline ${sizeClasses[size]} ${className}`}
      style={{ 
        letterSpacing: '-0.02em',
        gap: '0.125rem', // Tighter spacing between wordmark and slashes
      }}
    >
      <span style={{ color: BRAND_BLUE }}>
        {t(locale, 'brand.wordmark')}
      </span>
      <span 
        style={{ 
          color: BRAND_GREEN,
          marginLeft: '0.125rem', // Consistent tight spacing
        }} 
        className="font-normal"
      >
        {'//'}
      </span>
    </span>
  );

  if (asLink) {
    return (
      <Link href={`/${locale}`} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

