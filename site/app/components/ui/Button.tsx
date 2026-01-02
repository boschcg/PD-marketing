import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

/**
 * Button component with variants
 * Primary: navy background, white text
 * Secondary: border + navy text
 * Ghost: transparent with navy text
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'text-white bg-[var(--brand-blue)] hover:opacity-90 focus:ring-2 focus:ring-[var(--brand-green)] focus:ring-offset-2',
    secondary: 'text-[var(--brand-blue)] bg-white border border-[var(--pd-border-medium)] hover:bg-[var(--pd-surface-hover)] hover:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-green)] focus:ring-offset-2',
    ghost: 'text-[var(--brand-blue)] bg-transparent hover:bg-[var(--pd-surface-hover)] focus:ring-2 focus:ring-[var(--brand-green)] focus:ring-offset-2',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    // Check if it's an external URL
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

