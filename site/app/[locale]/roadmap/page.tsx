import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Section from "../../components/layout/Section";
import Prose from "../../components/Prose";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { getPage } from "@/lib/content/index";
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface RoadmapPageProps {
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
  
  const entry = await getPage('roadmap');
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}/roadmap`,
    meta: entry?.meta,
    defaultTitle: t(validLocale, 'meta.pages.roadmap.title'),
    defaultDescription: t(validLocale, 'meta.pages.roadmap.description'),
  });
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  const entry = await getPage('roadmap');
  if (!entry) {
    return (
      <PageShell>
        <p className="text-base text-gray-600">
          {t(validLocale, 'common.placeholder')}
        </p>
      </PageShell>
    );
  }
  
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
          {entry.meta?.title || 'Roadmap'}
        </h1>
        {entry.meta?.excerpt && (
          <p
            className="text-lg leading-relaxed max-w-3xl"
            style={{
              color: 'var(--pd-text-secondary)',
              lineHeight: 'var(--pd-font-body-line)',
            }}
          >
            {entry.meta.excerpt}
          </p>
        )}
      </Section>

      {/* Content Sections */}
      <Section variant="card" padY="md" maxWidth="7xl">
        <Prose maxWidth={true}>
          <div dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
        </Prose>
      </Section>
    </PageShell>
  );
}

