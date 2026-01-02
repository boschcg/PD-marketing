/**
 * Product Page End-to-End Flow Section
 * 
 * Per WO-PROD-002
 * 
 * Explains how Profitdrive operates end-to-end, from pipeline to profit.
 * Conceptual flow, not UI walkthrough.
 * 
 * Four parts:
 * 1. Framing: Profit is decided before delivery
 * 2. The End-to-End Flow (5 sequential steps)
 * 3. Where Profitdrive sits in this flow
 * 4. Time as the differentiator
 */

interface FlowStep {
  number: number;
  title: string;
  description: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: 1,
    title: 'Pipeline enters with assumptions',
    description: 'What work is likely to land, when it may start, and under what commercial expectations.',
  },
  {
    number: 2,
    title: 'Pricing sets commercial intent',
    description: 'Rates, margins, and deal structure define what "good" looks like before delivery begins.',
  },
  {
    number: 3,
    title: 'People & utilisation shape delivery cost',
    description: 'Internal capacity, utilisation, and contractor use determine whether work creates or erodes margin.',
  },
  {
    number: 4,
    title: 'Projects evolve revenue and extensions',
    description: 'Delivery rarely stays static — extensions, scope shifts, and delivery mix change the outcome.',
  },
  {
    number: 5,
    title: 'Actuals confirm or expose variance',
    description: 'Actuals reconcile the plan with reality, revealing where assumptions held — and where they didn\'t.',
  },
];

export default function ProductPageFlow() {
  return (
    <section 
      className="mb-16 lg:mb-24"
      style={{
        paddingTop: 'var(--pd-space-section)',
        paddingBottom: 'var(--pd-space-section)',
      }}
    >
      {/* Part 1: Framing: Profit Is Decided Before Delivery */}
      <div className="mb-12 lg:mb-16">
        <h2
          className="text-2xl lg:text-3xl font-semibold mb-4"
          style={{
            color: 'var(--pd-text)',
            lineHeight: '1.3',
          }}
        >
          Profit is decided before work begins
        </h2>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          In services firms, profit is rarely lost in accounting.
          It's lost earlier — in pricing assumptions, staffing decisions, delivery mix, and unmanaged extensions.
          Profitdrive is designed to surface these decisions while there is still time to change them.
        </p>
      </div>

      {/* Part 2: The End-to-End Flow */}
      <div className="mb-12 lg:mb-16">
        <div className="space-y-8">
          {FLOW_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex gap-6"
            >
              {/* Step Number */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: 'var(--pd-surface)',
                  border: '2px solid var(--pd-border)',
                  color: 'var(--pd-text)',
                  fontSize: '1.125rem',
                }}
              >
                {step.number}
              </div>
              
              {/* Step Content */}
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
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Where Profitdrive Sits in This Flow */}
      <div className="mb-12 lg:mb-16">
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          Profitdrive sits across this entire flow, continuously reconciling assumptions with reality — so leaders can see the impact of decisions while they still have options.
        </p>
      </div>

      {/* Part 4: Time as the Differentiator */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl font-medium"
          style={{
            color: 'var(--pd-text)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          This is the difference between understanding profit after the fact — and managing it deliberately, before it's locked in.
        </p>
      </div>
    </section>
  );
}

