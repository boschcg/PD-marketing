import { ReactNode } from 'react';
import Container from '../Container';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'muted' | 'tight' | 'base' | 'card';
  padY?: 'lg' | 'md' | 'sm';
  className?: string;
  maxWidth?: 'default' | '7xl';
  padding?: 'default' | 'hero';
}

/**
 * Section component - consistent section spacing with surface alternation
 * Uses Container for max-width and gutters matching homepage
 * Supports surface alternation: base → card → base
 */
export default function Section({ 
  children, 
  variant = 'default',
  padY = 'md',
  className = '',
  maxWidth = 'default',
  padding = 'default',
}: SectionProps) {
  const paddingClasses = {
    lg: 'py-16 lg:py-24',
    md: 'py-12 lg:py-16',
    sm: 'py-8 lg:py-12',
  };
  
  // Use standard padding classes (hero padding is already handled in lg variant)
  const finalPadding = paddingClasses[padY];

  // Surface alternation: base → card → base
  let backgroundColor = '';
  if (variant === 'base') {
    backgroundColor = 'var(--pd-surface-base)';
  } else if (variant === 'card') {
    backgroundColor = 'var(--pd-surface-card)';
  } else if (variant === 'muted') {
    backgroundColor = 'var(--pd-surface)';
  } else if (variant === 'default') {
    backgroundColor = 'var(--pd-surface-base)'; // Default to base
  }

  const borderStyle = variant === 'muted' || variant === 'card'
    ? { borderColor: 'var(--pd-border)' }
    : {};

  const contentPadding = padding === 'hero' ? 'px-6 md:px-8' : 'px-6 md:px-8';
  const maxWidthClass = maxWidth === '7xl' ? 'max-w-7xl mx-auto' : '';

  return (
    <section
      className={`${variant === 'muted' || variant === 'card' ? 'border-b' : ''} ${className}`}
      style={{
        backgroundColor,
        ...borderStyle,
      }}
    >
      <Container>
        <div className={finalPadding}>
          <div className={`${maxWidthClass} ${contentPadding}`}>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
