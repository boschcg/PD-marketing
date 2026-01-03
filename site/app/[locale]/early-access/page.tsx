import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Section from "../../components/layout/Section";
import SectionHeader from "../../components/layout/SectionHeader";
import EarlyAccessPageContent from "../../components/EarlyAccessPageContent";
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
      {/* Section 1-5: Page Content */}
      <EarlyAccessPageContent />
      
      {/* Section 6: Request Early Access Form */}
      <Section variant="base" padY="lg" maxWidth="7xl">
        <div className="flex justify-center">
          <div 
            className="bg-white rounded-xl p-8 w-full"
            style={{
              maxWidth: '36rem', // max-w-xl equivalent
              boxShadow: 'var(--pd-shadow-xl)',
              border: '1px solid var(--pd-border)',
            }}
          >
            <h2
              className="text-2xl lg:text-3xl font-semibold mb-4"
              style={{
                color: 'var(--pd-text)',
                lineHeight: '1.3',
              }}
            >
              Request Early Access
            </h2>
            <EarlyAccessForm locale={validLocale} />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

