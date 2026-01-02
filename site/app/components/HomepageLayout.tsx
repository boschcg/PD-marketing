import Container from './ui/Container';
import Button from './ui/Button';
import Card from './ui/Card';
import SectionHeading from './ui/SectionHeading';
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
      <section 
        className="bg-[var(--pd-surface)] border-b"
        style={{ borderColor: 'var(--pd-border)' }}
      >
        <Container>
          <div 
            className="py-12 md:py-16 lg:py-20"
            style={{ paddingTop: 'var(--pd-space-section)', paddingBottom: 'var(--pd-space-section)' }}
          >
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
                  className="mb-8 leading-relaxed"
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: 'var(--pd-font-body-line)',
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {heroSubhead}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href={`/${locale}/early-access`} variant="primary">
                    {t(locale, 'forms.earlyAccess.title')}
                  </Button>
                  <Button href={`/${locale}/product`} variant="secondary">
                    {t(locale, 'footer.links.productOverview')}
                  </Button>
                </div>
              </div>
              
              {/* Right: Profit Outlook Build-Up */}
              <div className="hidden lg:block">
                <Card hover className="bg-gradient-to-br from-[var(--pd-surface)] to-[var(--pd-surface-hover)]">
                  <ProfitOutlookBuildUp />
                </Card>
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
          </div>
        </Container>
      </section>

      {/* Value Props Section */}
      <section 
        className="bg-[var(--pd-surface)] border-b"
        style={{ borderColor: 'var(--pd-border)' }}
      >
        <Container>
          <div 
            className="py-12 md:py-16"
            style={{ paddingTop: 'var(--pd-space-section)', paddingBottom: 'var(--pd-space-section)' }}
          >
            <SectionHeading 
              title="What Profitdrive does"
              subtitle="Connect five realities that are usually fragmented"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hover>
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
              <Card hover>
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
              <Card hover>
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
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="bg-[var(--pd-surface)]">
        <Container>
          <div 
            className="py-12 md:py-16 lg:py-24"
            style={{ paddingTop: 'var(--pd-space-section)', paddingBottom: 'var(--pd-space-section)' }}
          >
            <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </Prose>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

