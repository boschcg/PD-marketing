import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';

/**
 * Product Page End-to-End Flow Section
 * 
 * Per WO-PROD-002
 * 
 * Explains how Profitdrive operates end-to-end, from pipeline to profit.
 * Conceptual flow, not UI walkthrough.
 * 
 * Five parts:
 * 1. Framing: Profit is decided before delivery
 * 2. The End-to-End Flow (5 sequential steps)
 * 3. Where Profitdrive sits in this flow
 * 4. Time as the differentiator
 * 5. Reinforcing line about actuals alignment
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
    title: 'Outlook confirmed',
    description: 'Actuals validate the outlook. Small variances confirm discipline; larger variances feed learning back into future decisions.',
  },
];

export default function ProductPageFlow() {
  return (
    <Section variant="card" padY="md" maxWidth="7xl">
      {/* Part 1: Framing: Profit Is Decided Before Delivery */}
      <SectionHeader
        title="Profit is decided before work begins"
        lead="In services firms, profit is rarely lost in accounting. It's lost earlier — in pricing assumptions, staffing decisions, delivery mix, and unmanaged extensions. Profitdrive is designed to surface these decisions while there is still time to change them."
      />

      {/* Part 2: The End-to-End Flow */}
      <div className="mb-8">
        <div className="space-y-4">
          {FLOW_STEPS.map((step, index) => (
            <div key={step.number}>
              {/* Step Row */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex gap-6">
                {/* Step Number */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold bg-slate-50 border border-slate-200"
                  style={{
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
              
              {/* Subtle connecting line between steps (except after last step) */}
              {index < FLOW_STEPS.length - 1 && (
                <div className="flex justify-center py-2">
                  <div 
                    className="w-px h-4"
                    style={{
                      backgroundColor: 'var(--pd-border)',
                      opacity: 0.5,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Where Profitdrive Sits in This Flow */}
      <div className="mb-6">
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
      <div className="mb-4">
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

      {/* Part 5: Reinforcing line about actuals */}
      <div>
        <p
          className="text-base leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          When Profitdrive is used well, actuals hold few surprises — they confirm what leadership already knew.
        </p>
      </div>
    </Section>
  );
}

