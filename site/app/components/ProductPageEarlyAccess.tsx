/**
 * Product Page - Transition to Early Access (Soft CTA, No Pressure)
 * 
 * Per WO-PROD-009
 * 
 * Provides a calm transition from explanation to action.
 * This section exists to:
 * - Give interested readers a clear next step
 * - Maintain Profitdrive's non-salesy, executive tone
 * - Bridge naturally into Early Access without urgency or pressure
 * 
 * Three parts:
 * 1. Framing: Explore Profitdrive at your own pace
 * 2. What Early Access Is (and Is Not) - two columns
 * 3. Action: Single CTA button
 */

import Button from './ui/Button';

interface ProductPageEarlyAccessProps {
  locale?: string;
}

const WHAT_EARLY_ACCESS_IS = [
  'Access to the full Profitdrive system',
  'Time to explore real data and scenarios',
  'Direct feedback into product direction',
  'A low-friction way to assess fit',
];

const WHAT_EARLY_ACCESS_IS_NOT = [
  'A sales-led trial',
  'A forced onboarding programme',
  'A long-term contract',
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

export default function ProductPageEarlyAccess({ locale = 'en' }: ProductPageEarlyAccessProps) {
  const earlyAccessUrl = `/${locale}/early-access`;

  return (
    <section 
      className="mb-16 lg:mb-24"
      style={{
        paddingTop: 'var(--pd-space-section)',
        paddingBottom: 'var(--pd-space-section)',
      }}
    >
      {/* Part 1: Framing */}
      <div className="mb-12 lg:mb-16">
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-4"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          Explore Profitdrive at your own pace
        </h2>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Early Access is designed for firms that want to explore Profitdrive thoughtfully —
          without a sales process or long-term commitment.
        </p>
      </div>

      {/* Part 2: What Early Access Is (and Is Not) - Two columns on desktop, stacked on mobile */}
      <div className="mb-12 lg:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column A: What Early Access Is */}
          <div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              What Early Access provides
            </h3>
            <BulletList items={WHAT_EARLY_ACCESS_IS} />
          </div>

          {/* Column B: What Early Access Is Not */}
          <div>
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              What Early Access is not
            </h3>
            <BulletList items={WHAT_EARLY_ACCESS_IS_NOT} />
          </div>
        </div>
      </div>

      {/* Part 3: Action - Single CTA */}
      <div>
        <Button href={earlyAccessUrl} variant="primary">
          Request Early Access
        </Button>
        <p
          className="mt-3 text-sm"
          style={{
            color: 'var(--pd-text-secondary)',
          }}
        >
          Early Access is intentionally limited and reviewed.
        </p>
      </div>
    </section>
  );
}

