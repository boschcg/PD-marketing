import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container component - max width + horizontal padding
 * Used on every page section
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div 
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ 
        maxWidth: 'var(--pd-container)',
        paddingLeft: 'var(--pd-container-padding)',
        paddingRight: 'var(--pd-container-padding)',
      }}
    >
      {children}
    </div>
  );
}

