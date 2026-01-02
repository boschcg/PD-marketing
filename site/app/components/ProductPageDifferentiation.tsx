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
          Designed for commercial clarity — not operational overhead
        </h2>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive is often compared to existing categories.
          In practice, it is deliberately different — by what it does and what it avoids.
        </p>
      </div>

      {/* Part 2: What Profitdrive Is Not */}
      <div className="mb-12 lg:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {NOT_COMPARISONS.map((comparison, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-[var(--pd-border)]"
              style={{
                backgroundColor: 'var(--pd-surface)',
              }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  color: 'var(--pd-text)',
                }}
              >
                {comparison.title}
              </h3>
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
          ))}
        </div>
      </div>

      {/* Part 3: What Profitdrive Is */}
      <div className="mb-12 lg:mb-16">
        <h3
          className="text-xl font-semibold mb-4"
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
    </section>
  );
}

