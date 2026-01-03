import Container from './ui/Container';
import Button from './ui/Button';
import Card from './ui/Card';
import SectionHeading from './ui/SectionHeading';
import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import BrandWordmark from './BrandWordmark';
import Prose from './Prose';
import ProfitOutlookBuildUp from './ProfitOutlookBuildUp';
import { t, type Locale } from '@/lib/i18n';

interface HomepageLayoutProps {
  title: string;
  description?: string;
  excerpt?: string;
  contentHtml: string;
  locale: Locale;
}

/**
 * Homepage-specific layout with hero, value bullets, and content
 * Designed for marketing-style homepage (not documentation)
 */
export default function HomepageLayout({
  title: _title, // eslint-disable-line @typescript-eslint/no-unused-vars
  description: _description, // eslint-disable-line @typescript-eslint/no-unused-vars
  excerpt: _excerpt, // eslint-disable-line @typescript-eslint/no-unused-vars
  contentHtml,
  locale,
}: HomepageLayoutProps) {
  // Locked hero copy per WO-HERO-003
  const heroHeadline = "Clarity on future profit. Confidence in today's decisions.";
  const heroSubhead = "Profitdrive gives services firms a clear forward profit outlook — showing how pipeline, pricing, and delivery choices will move revenue and margin before the month closes.";
  const insightLine = "Profit is shaped as much by delivery mix and utilisation as by revenue.";

  return (
    <main style={{ background: 'var(--pd-bg)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Section variant="base" padY="lg" padding="hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div>
            <h1 
              className="mb-5 leading-tight"
              style={{
                fontSize: '2rem',
                lineHeight: '1.2',
                fontWeight: '600',
                color: 'var(--pd-text)',
              }}
            >
              {heroHeadline}
            </h1>
            <p
              className="mb-12 leading-relaxed"
              style={{
                fontSize: '1.25rem',
                lineHeight: 'var(--pd-font-body-line)',
                color: 'var(--pd-text-secondary)',
              }}
            >
              {heroSubhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={`/${locale}/early-access`} variant="primary" className="min-h-[44px]">
                {t(locale, 'forms.earlyAccess.title')}
              </Button>
              <Button href={`/${locale}/product`} variant="secondary" className="border-[var(--pd-border)] text-[var(--pd-text-secondary)] hover:text-[var(--pd-text)] hover:bg-transparent min-h-[44px]">
                {t(locale, 'footer.links.productOverview')}
              </Button>
            </div>
          </div>
          
          {/* Right: Profit Outlook Build-Up */}
          <div className="order-2 lg:order-none mt-8 lg:mt-0">
            <div 
              className="rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md p-6"
            >
              <ProfitOutlookBuildUp />
            </div>
            <p
              className="mt-4 text-sm"
              style={{
                color: 'var(--pd-text-secondary)',
                textAlign: 'center',
              }}
            >
              {insightLine}
            </p>
          </div>
        </div>
      </Section>

      {/* Value Props Section */}
      <Section variant="card" padY="md">
        <SectionHeader
          title="What Profitdrive does"
          lead="Connect five realities that are usually fragmented"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover elevation="2" className="h-full">
            <h3 
              className="font-semibold mb-2"
              style={{ 
                fontSize: '1.125rem',
                color: 'var(--pd-text)',
              }}
            >
              Commercial Clarity
            </h3>
            <p 
              style={{
                fontSize: 'var(--pd-font-body-size)',
                lineHeight: 'var(--pd-font-body-line)',
                color: 'var(--pd-text-secondary)',
              }}
            >
              Make financial consequences visible early enough to change decisions.
            </p>
          </Card>
          <Card hover elevation="2" className="h-full">
            <h3 
              className="font-semibold mb-2"
              style={{ 
                fontSize: '1.125rem',
                color: 'var(--pd-text)',
              }}
            >
              Forward Profit View
            </h3>
            <p 
              style={{
                fontSize: 'var(--pd-font-body-size)',
                lineHeight: 'var(--pd-font-body-line)',
                color: 'var(--pd-text-secondary)',
              }}
            >
              See profit trajectory before month-end reporting, not after.
            </p>
          </Card>
          <Card hover elevation="2" className="h-full">
            <h3 
              className="font-semibold mb-2"
              style={{ 
                fontSize: '1.125rem',
                color: 'var(--pd-text)',
              }}
            >
              Decision Support
            </h3>
            <p 
              style={{
                fontSize: 'var(--pd-font-body-size)',
                lineHeight: 'var(--pd-font-body-line)',
                color: 'var(--pd-text-secondary)',
              }}
            >
              Support judgment with shared commercial models, not replace it.
            </p>
          </Card>
        </div>
      </Section>

      {/* Content Section */}
      <Section variant="base" padY="md" maxWidth="7xl">
        <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
          <Prose>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </Prose>
        </div>
      </Section>
    </main>
  );
}

