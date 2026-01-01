import { ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/**
 * Prose component for rendering markdown content
 * Uses Marketing Density Mode spacing and typography
 * Styles are defined in globals.css
 */
export default function Prose({ children, className = '' }: ProseProps) {
  return (
    <div className={`prose-content ${className}`}>
      {children}
    </div>
  );
}

