import Section from './layout/Section';

/**
 * Product Page Extensions & Change Requests Section
 * 
 * Per WO-PROD-010
 * 
 * Explains how extensions and change requests are commercial decisions,
 * and how Profitdrive handles them without sales process dependency.
 * 
 * Three parts:
 * 1. Framing: Extensions are commercial decisions
 * 2. What Profitdrive Enables (single block, no bullets)
 * 3. Why this matters (one sentence, optional)
 * 
 * Design: Visually lighter than WO-PROD-002, single column, no icons/screenshots.
 */

export default function ProductPageExtensions() {
  return (
    <Section variant="base" padY="sm" maxWidth="7xl">
      {/* Part 1: Framing */}
      <div className="mb-6">
        <h3
          className="text-xl lg:text-2xl font-semibold mb-3"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          Extensions and change requests are commercial decisions
        </h3>
        <p
          className="text-base leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Many firms treat extensions as delivery admin. In reality, they are often the most margin-defining decisions made during delivery.
        </p>
      </div>

      {/* Part 2: What Profitdrive Enables */}
      <div className="mb-4">
        <p
          className="text-base leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive supports extensions and change requests end-to-end. Teams can create extension phases, mark them as signed, and—where appropriate—automatically reflect the commercial impact in pipeline.
        </p>
        <p
          className="text-base leading-relaxed max-w-3xl mt-4"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          When no opportunity exists, Profitdrive can create and close one automatically using the signed extension value, ensuring revenue and margin impact is captured without relying on sales-led processes.
        </p>
      </div>

      {/* Part 3: Why this matters */}
      <div>
        <p
          className="text-base leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          This keeps commercial reality aligned with delivery reality, without adding friction or governance overhead.
        </p>
      </div>
    </Section>
  );
}
