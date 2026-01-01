import { ReactNode } from 'react';
import Container from './Container';

interface PageShellProps {
  children: ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-white">
      <Container>
        <div className="py-12 md:py-16 lg:py-24">
          {children}
        </div>
      </Container>
    </main>
  );
}

