import type { Metadata } from "next";
import HomepageLayout from "../components/HomepageLayout";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { getPage } from "@/lib/content/index";
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface HomePageProps {
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
  const entry = await getPage('home');
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}`,
    meta: entry?.meta,
    defaultTitle: t(validLocale, 'meta.pages.home.title'),
    defaultDescription: t(validLocale, 'meta.pages.home.description'),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  const entry = await getPage('home');
  if (!entry) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-24">
          <p className="text-base text-gray-600">
            {t(validLocale, 'common.placeholder')}
          </p>
        </div>
      </main>
    );
  }
  
  return (
    <HomepageLayout
      title={entry.meta?.title || 'Profitdrive'}
      description={entry.meta?.description}
      excerpt={entry.meta?.excerpt}
      contentHtml={entry.contentHtml}
      locale={validLocale}
    />
  );
}

