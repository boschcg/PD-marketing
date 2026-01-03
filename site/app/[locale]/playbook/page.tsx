import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
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
      {/* Page Hero */}
      <Section variant="base" padY="lg" padding="hero" maxWidth="7xl">
        <h1
          style={{
            fontSize: 'var(--pd-font-h1-size)',
            lineHeight: 'var(--pd-font-h1-line)',
            fontWeight: 'var(--pd-font-h1-weight)',
            letterSpacing: 'var(--pd-font-h1-spacing)',
            color: 'var(--pd-text)',
            marginBottom: '1rem',
          }}
        >
          {t(validLocale, 'pages.playbook.title')}
        </h1>
      </Section>

      {/* Playbook Entries */}
      <Section variant="card" padY="md" maxWidth="7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => {
            // Generate slug for this entry
            const filename = parse(entry.filePath).name;
            const slug = getSlugFromFilename(filename, entry.meta.slug);
            
            return (
              <Link
                key={slug}
                href={`/${validLocale}/playbook/${slug}`}
                className="block group"
              >
                <Card hover elevation="2" className="h-full">
                  <h2
                    className="mb-2 group-hover:opacity-80 transition-opacity"
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--pd-text)',
                    }}
                  >
                    {entry.meta.title}
                  </h2>
                  {entry.meta.excerpt && (
                    <p
                      className="mb-3 leading-relaxed"
                      style={{
                        fontSize: 'var(--pd-font-small-size)',
                        lineHeight: 'var(--pd-font-body-line)',
                        color: 'var(--pd-text-secondary)',
                      }}
                    >
                      {entry.meta.excerpt}
                    </p>
                  )}
                  <div
                    className="text-xs"
                    style={{
                      color: 'var(--pd-text-secondary)',
                    }}
                  >
                    {t(validLocale, 'common.readTime', { minutes: entry.readTimeMin })}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
    </PageShell>
  );
}

