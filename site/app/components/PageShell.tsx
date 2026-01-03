import { ReactNode } from 'react';
import Container from './Container';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--pd-surface-base)' }}>
      {children}
    </main>
  );
}

