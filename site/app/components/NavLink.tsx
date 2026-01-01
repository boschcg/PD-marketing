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
        text-sm font-medium transition-colors
        ${isActive 
          ? 'text-gray-900 font-semibold border-b-2 border-gray-900 pb-1' 
          : 'text-gray-600 hover:text-gray-900'
        }
      `}
    >
      {children}
    </Link>
  );
}

