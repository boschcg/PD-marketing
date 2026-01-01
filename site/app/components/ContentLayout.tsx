import { ReactNode } from 'react';
import Prose from './Prose';
import TableOfContents from './TableOfContents';
import { TocItem } from '@/lib/content/readMarkdown';

interface ContentLayoutProps {
  children: ReactNode;
  toc?: TocItem[];
  locale: string;
}

/**
 * Layout component for content pages with optional TOC
 */
export default function ContentLayout({ children, toc, locale: _locale }: ContentLayoutProps) {
  const hasToc = toc && toc.length >= 3;

  if (!hasToc) {
    return <Prose>{children}</Prose>;
  }

  return (
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
        <div className="lg:hidden mb-8 pb-6 border-b border-gray-200">
          <TableOfContents items={toc} locale={_locale} />
        </div>
        
        <Prose>{children}</Prose>
      </div>
    </div>
  );
}

