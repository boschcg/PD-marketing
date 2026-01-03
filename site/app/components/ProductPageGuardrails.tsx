import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';

/**
 * Product Page Guardrails & Commercial Discipline Section
 * 
 * Per WO-PROD-003
 * 
 * Explains how Profitdrive enforces commercial discipline without bureaucracy.
 * Reduces executive adoption risk by clarifying what Profitdrive does vs does not control.
 * 
 * Four parts:
 * 1. Framing: Commercial discipline without heavy governance
 * 2. What Profitdrive Holds Consistent (guardrails)
 * 3. What Remains in Leadership Judgement (autonomy)
 * 4. Why This Matters (closing)
 */

const CONSISTENT_ITEMS = [
  'Commercial assumptions behind deals and extensions',
  'Margin expectations and targets',
  'Capacity and utilisation reality',
  'Delivery economics across projects',
  'Alignment between plans and actuals',
];

const JUDGEMENT_ITEMS = [
  'Pricing strategy and trade-offs',
  'Investment and growth bets',
  'Risk tolerance on specific deals',
  'When to prioritise margin vs growth',
  'How to respond to emerging information',
];

export default function ProductPageGuardrails() {
  return (
    <Section variant="card" padY="md" maxWidth="7xl">
      {/* Part 1: Framing */}
      <SectionHeader
        title="Commercial discipline without heavy governance"
        lead="Profitdrive is designed to support better commercial decisions — not to centralise control or slow teams down. It provides shared guardrails, while leaving judgement with leaders."
      />

      {/* Part 2: What Profitdrive Holds Consistent */}
      <div className="mb-12 lg:mb-16">
        <h3
          className="text-xl font-semibold mb-4"
          style={{
            color: 'var(--pd-text)',
          }}
        >
          What stays consistent
        </h3>
        <ul className="space-y-2 max-w-3xl">
          {CONSISTENT_ITEMS.map((item, index) => (
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
      </div>

      {/* Part 3: What Remains in Leadership Judgement */}
      <div className="mb-8">
        <h3
          className="text-xl font-semibold mb-3"
          style={{
            color: 'var(--pd-text)',
          }}
        >
          What remains a leadership decision
        </h3>
        <ul className="space-y-2 max-w-3xl">
          {JUDGEMENT_ITEMS.map((item, index) => (
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
      </div>

      {/* Part 4: Why This Matters */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          This balance allows teams to move faster with confidence —
          reducing late surprises without adding process overhead.
        </p>
      </div>
    </Section>
  );
}

