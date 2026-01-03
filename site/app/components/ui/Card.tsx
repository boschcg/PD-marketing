import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  elevation?: '0' | '1' | '2';
}

/**
 * Card component - Marketing elevation system
 * Standardized card styling across all pages
 * Level 0: background sections (no shadow)
 * Level 1: content cards (shadow-sm border)
 * Level 2: hover elevation (shadow-md on hover with transition)
 */
export default function Card({ 
  children, 
  className = '', 
  hover = false,
  elevation = '1',
}: CardProps) {
  const baseClasses = 'rounded-lg border border-slate-200 bg-white shadow-sm';
  const transitionClass = hover ? 'transition-shadow duration-150 hover:shadow-md' : '';
  
  const elevationClasses = {
    '0': 'border-0 shadow-none',
    '1': baseClasses,
    '2': `${baseClasses} ${transitionClass}`,
  };

  return (
    <div
      className={`p-6 ${elevationClasses[elevation]} ${className}`}
    >
      {children}
    </div>
  );
}

