import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import ContentLayout from "../../components/ContentLayout";
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
      <ContentLayout toc={entry.toc} locale={validLocale}>
        <div dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
      </ContentLayout>
    </PageShell>
  );
}

