'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  locale: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NavLink({ href, children, locale: _locale }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors relative inline-block
        ${isActive 
          ? 'text-[var(--brand-blue)] font-semibold pb-2' 
          : 'text-[var(--pd-text-secondary)] hover:text-[var(--brand-blue)] pb-2'
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
          }}
        />
      )}
    </Link>
  );
}

