import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import Card from './ui/Card';

/**
 * Early Access Page - Structure & Narrative (Low-friction, Executive-safe)
 * 
 * Per WO-EA-001
 * 
 * Defines the Early Access page as a calm qualification + invitation surface.
 * 
 * Six sections:
 * 1. Page Header (Framing)
 * 2. Who Early Access Is For
 * 3. What You Get
 * 4. What Setup Looks Like
 * 5. What Early Access Is (and Is Not)
 * 6. Request Early Access (Form) - handled separately
 */

const WHO_IS_FOR = [
  'Owners / CEOs / Managing Directors of services firms',
  'Finance leaders who need forward visibility without extra headcount',
  'Ops / delivery leaders responsible for utilisation and margin outcomes',
  'Firms feeling margin pressure despite strong demand',
  'Teams currently relying on spreadsheets and manual reconciliation',
];

const WHAT_YOU_GET = [
  {
    title: 'Forward profit outlook across pipeline and delivery',
    description: 'See how pipeline decisions and delivery execution shape profit before month-end.',
  },
  {
    title: 'Visibility of margin drivers',
    description: 'Understand how pricing, utilisation, and delivery mix affect outcomes.',
  },
  {
    title: 'A shared commercial view',
    description: 'Align leadership, finance, and operations around the same forward-looking numbers.',
  },
  {
    title: 'Direct feedback channel into product direction',
    description: 'Shape what Profitdrive becomes through real usage and feedback.',
  },
  {
    title: 'A calm evaluation process',
    description: 'No sales sequence, no pressure — explore at your own pace.',
  },
];

const SETUP_STEPS = [
  {
    number: 1,
    title: 'Connect or import the essentials',
    description: 'Pipeline, people, projects, and rates — the core data that drives profit decisions.',
  },
  {
    number: 2,
    title: 'Review assumptions and confirm the initial outlook',
    description: 'Validate how Profitdrive interprets your data and adjust as needed.',
  },
  {
    number: 3,
    title: 'Use the outlook in real pricing/staffing decisions',
    description: 'Apply forward profit clarity to actual commercial choices.',
  },
];

const WHAT_IT_IS = [
  'A guided, low-friction evaluation',
  'Access to the working system',
  'A structured way to test fit with real data',
  'A feedback loop with the team',
];

const WHAT_IT_IS_NOT = [
  'A sales-led trial',
  'A long-term contract',
  'A forced implementation program',
  'A commitment to purchase',
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <span
            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--pd-text-secondary)',
            }}
          />
          <span
            className="text-base leading-relaxed"
            style={{
              color: 'var(--pd-text-secondary)',
              lineHeight: 'var(--pd-font-body-line)',
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function EarlyAccessPageContent() {
  return (
    <>
      {/* Section 1: Page Header (Framing) */}
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
          Early Access
        </h1>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Early Access is for services firms that want forward profit clarity without adopting a heavy system.
          Explore Profitdrive with your own data and decide if it fits.
        </p>
      </Section>

      {/* Section 2: Who Early Access Is For */}
      <Section variant="card" padY="md" maxWidth="7xl">
        <SectionHeader
          title="Who Early Access is for"
        />
        <BulletList items={WHO_IS_FOR} />
      </Section>

      {/* Section 3: What You Get */}
      <Section variant="base" padY="md" maxWidth="7xl">
        <SectionHeader
          title="What you get"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_YOU_GET.map((item, index) => (
            <Card key={index} hover elevation="2">
              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: '1.125rem',
                  color: 'var(--pd-text)',
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: 'var(--pd-text-secondary)',
                  lineHeight: 'var(--pd-font-body-line)',
                }}
              >
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 4: What Setup Looks Like */}
      <Section variant="card" padY="md" maxWidth="7xl">
        <SectionHeader
          title="What setup looks like"
        />
        <div className="space-y-6">
          {SETUP_STEPS.map((step) => (
            <Card key={step.number} elevation="1" className="flex gap-6">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: 'var(--pd-surface-base)',
                  color: 'var(--pd-text)',
                  border: '2px solid var(--pd-border)',
                  fontSize: '1.125rem',
                }}
              >
                {step.number}
              </div>
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: 'var(--pd-text)',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: 'var(--pd-text-secondary)',
                    lineHeight: 'var(--pd-font-body-line)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Section 5: What Early Access Is (and Is Not) */}
      <Section variant="base" padY="md" maxWidth="7xl">
        <SectionHeader
          title="How Early Access works"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column A: What it is */}
          <div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              What it is
            </h3>
            <BulletList items={WHAT_IT_IS} />
          </div>

          {/* Column B: What it is not */}
          <div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              What it is not
            </h3>
            <BulletList items={WHAT_IT_IS_NOT} />
          </div>
        </div>
      </Section>
    </>
  );
}

