'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  locale: string;
}

/**
 * NavLink component - Marketing navigation with app-aligned behavior
 * Active state: anchored underline (matching app cockpit row)
 * Hover: subtle text emphasis, not color jumps
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NavLink({ href, children, locale: _locale }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-all relative inline-block pb-2
        ${isActive 
          ? 'text-[var(--pd-text)] font-semibold' 
          : 'text-[var(--pd-text-secondary)] hover:text-[var(--pd-text)] hover:font-medium'
        }
      `}
    >
      {children}
      {isActive && (
        <span 
          className="absolute bottom-0 left-0 right-0"
          style={{ 
            backgroundColor: 'var(--brand-blue)',
            height: '2px',
            borderRadius: '1px',
          }}
        />
      )}
    </Link>
  );
}

