import type { Metadata } from "next";
import PageShell from "../../components/PageShell";
import Section from "../../components/layout/Section";
import ContentLayout from "../../components/ContentLayout";
import ProductPageOpening from "../../components/ProductPageOpening";
import ProductPageFlow from "../../components/ProductPageFlow";
import ProductPageExtensions from "../../components/ProductPageExtensions";
import ProductPageGuardrails from "../../components/ProductPageGuardrails";
import ProductPageReplaces from "../../components/ProductPageReplaces";
import ProductPageRoles from "../../components/ProductPageRoles";
import ProductPageAdoption from "../../components/ProductPageAdoption";
import ProductPageDifferentiation from "../../components/ProductPageDifferentiation";
import ProductPageProofSignals from "../../components/ProductPageProofSignals";
import ProductPageEarlyAccess from "../../components/ProductPageEarlyAccess";
import { t } from "@/lib/i18n";
import { getValidLocale } from "@/lib/locale-utils";
import { getPage } from "@/lib/content/index";
import { buildMetadata } from "@/lib/seo/buildMetadata";

interface ProductPageProps {
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
  const entry = await getPage('product');
  
  return buildMetadata({
    locale: validLocale,
    path: `/${validLocale}/product`,
    meta: entry?.meta,
    defaultTitle: t(validLocale, 'meta.pages.product.title'),
    defaultDescription: t(validLocale, 'meta.pages.product.description'),
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale } = await params;
  const validLocale = getValidLocale(locale);
  
  const entry = await getPage('product');
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
      {/* Product Page Opening Section (WO-PROD-001) - base */}
      <ProductPageOpening />
      
      {/* Product Page End-to-End Flow Section (WO-PROD-002) - card */}
      <ProductPageFlow />
      
      {/* Product Page Extensions & Change Requests Section (WO-PROD-010) - base */}
      <ProductPageExtensions />
      
      {/* Product Page Guardrails & Commercial Discipline Section (WO-PROD-003) - card */}
      <ProductPageGuardrails />
      
      {/* Product Page What Profitdrive Replaces Section (WO-PROD-004) - base */}
      <ProductPageReplaces />
      
      {/* Product Page Where Teams Use Profitdrive Section (WO-PROD-005) - card */}
      <ProductPageRoles />
      
      {/* Product Page What Adoption Looks Like Section (WO-PROD-006) - base */}
      <ProductPageAdoption />
      
      {/* Product Page Why Profitdrive Is Different Section (WO-PROD-007) - card */}
      <ProductPageDifferentiation />
      
      {/* Product Page Proof Signals Section (WO-PROD-008) - base */}
      <ProductPageProofSignals />
      
      {/* Product Page Early Access Section (WO-PROD-009) - card */}
      <ProductPageEarlyAccess locale={validLocale} />
      
      {/* Additional content from markdown */}
      {entry.contentHtml && (
        <Section variant="base" padY="md" maxWidth="7xl">
          <ContentLayout toc={entry.toc} locale={validLocale}>
            <div dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
          </ContentLayout>
        </Section>
      )}
    </PageShell>
  );
}

