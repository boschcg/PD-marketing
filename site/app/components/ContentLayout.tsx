import { ReactNode } from 'react';
import Prose from './Prose';
import TableOfContents from './TableOfContents';
import { TocItem } from '@/lib/content/readMarkdown';

interface ContentLayoutProps {
  children: ReactNode;
  toc?: TocItem[];
  locale: string;
  useSections?: boolean;
}

/**
 * Layout component for content pages with optional TOC
 * When useSections is true, wraps content in structured sections
 */
import Container from './Container';

export default function ContentLayout({ children, toc, locale: _locale, useSections = false }: ContentLayoutProps) {
  const hasToc = toc && toc.length >= 3;

  if (!hasToc) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Prose maxWidth={true}>{children}</Prose>
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* TOC - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <TableOfContents items={toc} locale={_locale} />
            </div>
          </aside>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* TOC on mobile - shown at top */}
            <div className="lg:hidden mb-8 pb-6 border-b" style={{ borderColor: 'var(--pd-border)' }}>
              <TableOfContents items={toc} locale={_locale} />
            </div>
            
            <Prose maxWidth={true}>{children}</Prose>
          </div>
        </div>
      </div>
    </Container>
  );
}

