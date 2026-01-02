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
    title: 'Actuals',
    description: 'What ultimately happens, aligned to accounting reality.',
  },
];

export default function ProductPageOpening() {
  return (
    <section 
      className="mb-16 lg:mb-24"
      style={{
        paddingTop: 'var(--pd-space-section)',
        paddingBottom: 'var(--pd-space-section)',
      }}
    >
      {/* Part 1: Outcome Reminder */}
      <div className="mb-12 lg:mb-16">
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-4"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          From future profit visibility to confident decisions
        </h2>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive exists to make future profit visible early enough to act on it.
          Not as a report, and not as a spreadsheet — but as a live, shared view of how commercial decisions shape revenue and margin before they're locked in.
        </p>
      </div>

      {/* Part 2: The Five Connected Realities */}
      <div className="mb-12 lg:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {FIVE_REALITIES.map((reality, index) => (
            <div
              key={index}
              className="p-5 rounded-lg border border-[var(--pd-border)]"
              style={{
                backgroundColor: 'var(--pd-surface)',
              }}
            >
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
            </div>
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
    </section>
  );
}

