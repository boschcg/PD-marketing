import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { listPlaybookEntries } from "@/lib/content/index";
import { getSlugFromFilename } from "@/lib/content/readMarkdown";
import { parse } from 'path';
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface PlaybookPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}/playbook`,
    meta: undefined, // Playbook index has no content entry
    defaultTitle: t(validLocale, 'meta.pages.playbook.title'),
    defaultDescription: t(validLocale, 'meta.pages.playbook.description'),
  });
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  const entries = await listPlaybookEntries();
  
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8">
        {t(validLocale, 'pages.playbook.title')}
      </h1>
      
      <div className="space-y-6 mt-8">
        {entries.map((entry) => {
          // Generate slug for this entry
          const filename = parse(entry.filePath).name;
          const slug = getSlugFromFilename(filename, entry.meta.slug);
          
          return (
            <article
              key={slug}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <Link
                href={`/${validLocale}/playbook/${slug}`}
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {entry.meta.title}
                    </h2>
                    {entry.meta.excerpt && (
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {entry.meta.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{t(validLocale, 'common.readTime', { minutes: entry.readTimeMin })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

