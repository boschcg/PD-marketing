import { ReactNode } from 'react';

interface ProseProps {
  children: ReactNode;
  className?: string;
  maxWidth?: boolean;
}

/**
 * Prose component for rendering markdown content
 * Restrained styling - max-width ~70ch for long text blocks
 * Styles are defined in globals.css
 */
export default function Prose({ children, className = '', maxWidth = true }: ProseProps) {
  return (
    <div 
      className={`prose-content ${className}`}
      style={maxWidth ? { maxWidth: '70ch' } : {}}
    >
      {children}
    </div>
  );
}

