import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string | ReactNode;
  className?: string;
}

/**
 * SectionHeader component - consistent section heading structure
 * Supports optional eyebrow, H2 title, and lead paragraph
 */
export default function SectionHeader({ 
  eyebrow, 
  title, 
  lead,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 lg:mb-8 ${className}`}>
      {eyebrow && (
        <div
          className="text-sm font-medium uppercase tracking-wide mb-3"
          style={{
            color: 'var(--pd-text-secondary)',
            fontSize: 'var(--pd-font-small-size)',
            letterSpacing: '0.05em',
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="mb-3"
        style={{
          fontSize: 'var(--pd-font-h2-size)',
          lineHeight: 'var(--pd-font-h2-line)',
          fontWeight: 'var(--pd-font-h2-weight)',
          letterSpacing: 'var(--pd-font-h2-spacing)',
          color: 'var(--pd-text)',
        }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
