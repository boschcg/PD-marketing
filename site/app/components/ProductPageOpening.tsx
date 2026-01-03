import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import Card from './ui/Card';

/**
 * Product Page Opening Component
 * 
 * Per WO-PROD-001
 * 
 * Three-part opening section that:
 * 1. Reconnects to homepage hero outcome
 * 2. Explains the five connected realities
 * 3. Introduces the system concept
 * 
 * This is the narrative hinge between homepage and product detail.
 */

interface RealityBlock {
  title: string;
  description: string;
}

const FIVE_REALITIES: RealityBlock[] = [
  {
    title: 'Pipeline',
    description: 'What work is likely to land, when, and on what terms.',
  },
  {
    title: 'Pricing',
    description: 'The commercial assumptions behind deals and extensions.',
  },
  {
    title: 'People',
    description: 'Who delivers the work — internal capacity, utilisation, and cost.',
  },
  {
    title: 'Projects',
    description: 'How work is actually delivered and extended over time.',
  },
  {
    title: 'Outlook vs Actuals',
    description: 'A continuous check that planned profit remains aligned to accounting reality — with variances surfaced early, not after the month closes.',
  },
];

export default function ProductPageOpening() {
  return (
    <Section variant="base" padY="lg" maxWidth="7xl">
      {/* Part 1: Outcome Reminder */}
      <SectionHeader
        title="From future profit visibility to confident decisions"
        lead="Profitdrive exists to make future profit visible early enough to act on it. Not as a report, and not as a spreadsheet — but as a live, shared view of how commercial decisions shape revenue and margin before they're locked in."
      />

      {/* Part 2: The Five Connected Realities */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {FIVE_REALITIES.map((reality, index) => (
            <Card key={index} elevation="2" hover>
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  color: 'var(--pd-text)',
                }}
              >
                {reality.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--pd-text-secondary)',
                  lineHeight: 'var(--pd-font-body-line)',
                }}
              >
                {reality.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Part 3: The System Framing */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive brings these realities together into a single commercial decision system — so leaders can see the impact of pricing, staffing, and delivery choices before those decisions are locked into the P&L.
        </p>
      </div>
    </Section>
  );
}

