'use client';

import { TocItem } from '@/lib/content/readMarkdown';

interface TableOfContentsProps {
  items: TocItem[];
  locale: string; // Reserved for future i18n of "Contents" label
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without scrolling
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="mb-8 md:mb-0">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Contents</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={`
              text-sm
              ${item.level === 2 ? 'pl-0' : 'pl-4'}
            `}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

