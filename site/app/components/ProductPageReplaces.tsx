import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';

/**
 * Product Page - What Profitdrive Replaces (and What It Doesn't)
 * 
 * Per WO-PROD-004
 * 
 * Clarifies how Profitdrive fits into an existing services firm stack.
 * Prevents category confusion and reduces perceived implementation risk.
 * 
 * Three parts:
 * 1. Framing: Designed to work with your existing systems
 * 2. What Profitdrive Replaces or Reduces (bullet list)
 * 3. What Profitdrive Does Not Replace (bullet list)
 */

const REPLACES_ITEMS = [
  'Spreadsheet-based forecasting and scenario models',
  'Manual reconciliation between pipeline, delivery, and finance',
  'Lagging profit reports discovered after month-end',
  'Fragmented views across sales, delivery, and finance teams',
  'One-off models built by individuals, not shared systems',
];

const DOES_NOT_REPLACE_ITEMS = [
  'Your accounting or ERP system',
  'Your CRM or sales pipeline tools',
  'Your project delivery or time-tracking systems',
  'Leadership judgement and decision-making',
  'Firm-specific strategy and risk appetite',
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

export default function ProductPageReplaces() {
  return (
    <Section variant="base" padY="md" maxWidth="7xl">
      {/* Part 1: Framing */}
      <SectionHeader
        title="Designed to work with your existing systems"
        lead="Profitdrive is not a replacement for your core operating systems. It sits above them, bringing commercial clarity to decisions they don't connect."
      />

      {/* Part 2 & 3: Two-column layout on desktop, single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Part 2: What Profitdrive Replaces or Reduces */}
        <div>
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: 'var(--pd-text)',
            }}
          >
            What Profitdrive replaces or reduces reliance on
          </h3>
          <BulletList items={REPLACES_ITEMS} />
        </div>

        {/* Part 3: What Profitdrive Does Not Replace */}
        <div>
          <h3
            className="text-xl font-semibold mb-3"
            style={{
              color: 'var(--pd-text)',
            }}
          >
            What Profitdrive does not replace
          </h3>
          <BulletList items={DOES_NOT_REPLACE_ITEMS} />
        </div>
      </div>
    </Section>
  );
}

