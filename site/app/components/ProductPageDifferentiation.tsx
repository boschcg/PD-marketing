import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';

/**
 * Product Page - Why Profitdrive Is Different
 * 
 * Per WO-PROD-007
 * 
 * Clearly positions Profitdrive by differentiation through exclusion.
 * Prevents misclassification and reduces comparison-driven confusion.
 * 
 * Four parts:
 * 1. Framing: Designed for commercial clarity — not operational overhead
 * 2. What Profitdrive Is Not (3 comparison blocks)
 * 3. What Profitdrive Is (single paragraph)
 * 4. Close the section
 */

interface ComparisonBlock {
  title: string;
  explanation: string;
}

const NOT_COMPARISONS: ComparisonBlock[] = [
  {
    title: 'Not a PSA',
    explanation: 'No heavy workflows, no job or task management, and no process redesign required.',
  },
  {
    title: 'Not a Forecasting Spreadsheet',
    explanation: 'No manual model rebuilding, no version sprawl, and no dependency on individual owners.',
  },
  {
    title: 'Not an ERP or Finance System',
    explanation: 'No bookkeeping, no compliance workflows, and no replacement of accounting systems.',
  },
];

export default function ProductPageDifferentiation() {
  return (
    <Section variant="card" padY="md" maxWidth="7xl">
      {/* Part 1: Framing */}
      <SectionHeader
        title="Designed for commercial clarity — not operational overhead"
        lead="Profitdrive is often compared to existing categories. In practice, it is deliberately different — by what it does and what it avoids."
      />

      {/* Part 2: What Profitdrive Is Not - 3-Column Comparison Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {NOT_COMPARISONS.map((comparison, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full"
            >
              {/* Header with muted background */}
              <div className="bg-slate-50 px-6 py-4 rounded-t-lg border-b border-slate-200">
                <h3
                  className="text-lg font-semibold"
                  style={{
                    color: 'var(--pd-text)',
                  }}
                >
                  {comparison.title}
                </h3>
              </div>
              
              {/* Body text on white */}
              <div className="px-6 py-5 flex-1">
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: 'var(--pd-text-secondary)',
                    lineHeight: 'var(--pd-font-body-line)',
                  }}
                >
                  {comparison.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: What Profitdrive Is */}
      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-3"
          style={{
            color: 'var(--pd-text)',
          }}
        >
          What Profitdrive is
        </h3>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive is a commercial decision system that sits above existing tools,
          connecting pipeline, pricing, people, delivery, and actuals to show how profit is shaped before it's locked in.
        </p>
      </div>

      {/* Part 4: Close the Section */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          This allows firms to operate with clarity and discipline — without adding operational complexity.
        </p>
      </div>
    </Section>
  );
}

