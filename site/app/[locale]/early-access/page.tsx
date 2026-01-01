import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import ContentLayout from "../../components/ContentLayout";
import EarlyAccessForm from "../../components/EarlyAccessForm";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { getPage } from "@/lib/content/index";
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface EarlyAccessPageProps {
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
  
  const entry = await getPage('early-access');
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}/early-access`,
    meta: entry?.meta,
    defaultTitle: t(validLocale, 'meta.pages.earlyAccess.title'),
    defaultDescription: t(validLocale, 'meta.pages.earlyAccess.description'),
  });
}

export default async function EarlyAccessPage({ params }: EarlyAccessPageProps) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  const entry = await getPage('early-access');
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
        <EarlyAccessForm locale={validLocale} />
      </ContentLayout>
    </PageShell>
  );
}

