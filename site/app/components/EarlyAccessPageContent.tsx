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
    <div className="space-y-16 lg:space-y-24">
      {/* Section 1: Page Header (Framing) */}
      <section>
        <h1
          className="text-3xl lg:text-4xl font-semibold mb-4"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
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
      </section>

      {/* Section 2: Who Early Access Is For */}
      <section>
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          Who Early Access is for
        </h2>
        <BulletList items={WHO_IS_FOR} />
      </section>

      {/* Section 3: What You Get */}
      <section>
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          What you get
        </h2>
        <div className="space-y-6">
          {WHAT_YOU_GET.map((item, index) => (
            <div key={index}>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
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
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: What Setup Looks Like */}
      <section>
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          What setup looks like
        </h2>
        <div className="space-y-8">
          {SETUP_STEPS.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-base"
                style={{
                  backgroundColor: 'var(--pd-surface)',
                  color: 'var(--pd-text)',
                  border: '1px solid var(--pd-border)',
                }}
              >
                {step.number}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-2"
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
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: What Early Access Is (and Is Not) */}
      <section>
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-6"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          How Early Access works
        </h2>
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
      </section>
    </div>
  );
}

