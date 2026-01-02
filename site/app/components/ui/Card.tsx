import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Card component - surface background + border + radius + padding
 * Optional hover elevation
 */
export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-[var(--pd-surface)] border border-[var(--pd-border)] rounded-lg p-6 ${hover ? 'transition-shadow hover:shadow-md' : ''} ${className}`}
      style={{
        borderRadius: 'var(--pd-r-lg)',
        padding: 'var(--pd-space-card)',
      }}
    >
      {children}
    </div>
  );
}

