import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import Section from "../../../components/layout/Section";
import ContentLayout from "../../../components/ContentLayout";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { resolvePlaybookBySlug, listPlaybookEntries } from "@/lib/content/index";
import { getSlugFromFilename, getLegacySlug } from "@/lib/content/readMarkdown";
import { parse } from 'path';
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface PlaybookSlugPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const entries = await listPlaybookEntries();
  // Generate params for canonical slugs
  return entries.map((entry) => {
    const filename = parse(entry.filePath).name;
    const slug = getSlugFromFilename(filename, entry.meta.slug);
    return {
      locale: 'en',
      slug,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = getValidLocale(locale);
  const entry = await resolvePlaybookBySlug(slug);
  
  if (!entry) {
    return buildMetadata({
      locale: validLocale,
      path: `/${validLocale}/playbook/${slug}`,
      meta: undefined,
      defaultTitle: t(validLocale, 'pages.playbookSlug.title'),
      defaultDescription: t(validLocale, 'meta.pages.playbook.description'),
    });
  }
  
  // Get canonical slug for this entry
  const filename = parse(entry.filePath).name;
  const canonicalSlug = getSlugFromFilename(filename, entry.meta.slug);
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}/playbook/${canonicalSlug}`,
    meta: entry.meta,
    defaultTitle: entry.meta.title || t(validLocale, 'pages.playbookSlug.title'),
    defaultDescription: entry.meta.description || entry.meta.excerpt || t(validLocale, 'meta.pages.playbook.description'),
  });
}

export default async function PlaybookSlugPage({ params }: PlaybookSlugPageProps) {
  const { locale, slug } = await params;
  const validLocale = getValidLocale(locale);
  
  const entry = await resolvePlaybookBySlug(slug);
  
  if (!entry) {
    notFound();
  }
  
  // If this is a legacy slug, redirect to canonical slug
  const filename = parse(entry.filePath).name;
  const canonicalSlug = getSlugFromFilename(filename, entry.meta.slug);
  const legacySlug = getLegacySlug(filename);
  
  if (slug === legacySlug && slug !== canonicalSlug) {
    redirect(`/${validLocale}/playbook/${canonicalSlug}`);
  }
  
  return (
    <PageShell>
      {/* Breadcrumb and back link */}
      <Section variant="base" padY="md" maxWidth="7xl">
        <nav className="mb-6 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
          <div className="flex items-center gap-2">
            <Link
              href={`/${validLocale}/playbook`}
              className="hover:opacity-80 transition-opacity"
              style={{ color: 'var(--pd-text-secondary)' }}
            >
              {t(validLocale, 'common.playbook')}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--pd-text)' }}>{entry.meta.title}</span>
          </div>
          <Link
            href={`/${validLocale}/playbook`}
            className="mt-2 inline-block text-sm hover:opacity-80 transition-opacity"
            style={{ color: 'var(--pd-text-secondary)' }}
          >
            ← {t(validLocale, 'common.backToPlaybook')}
          </Link>
        </nav>
        
        <ContentLayout toc={entry.toc} locale={validLocale}>
          <div dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
        </ContentLayout>
      </Section>
    </PageShell>
  );
}

