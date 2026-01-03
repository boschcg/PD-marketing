import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import Card from './ui/Card';

/**
 * Product Page - Proof Signals (Without Case Studies)
 * 
 * Per WO-PROD-008
 * 
 * Introduces credibility and seriousness signals without relying on
 * case studies, testimonials, or logos.
 * 
 * Three parts:
 * 1. Framing: Built for firms that take profit seriously
 * 2. Proof Signals (3 signal blocks)
 * 3. Close the section
 */

interface ProofSignal {
  title: string;
  explanation: string;
}

const PROOF_SIGNALS: ProofSignal[] = [
  {
    title: 'Commercially Grounded Design',
    explanation: 'Built from real services firm economics, designed around pricing, capacity, utilisation, and delivery mix — no abstract financial theory.',
  },
  {
    title: 'Opinionated Boundaries',
    explanation: 'Clear decisions about what Profitdrive will and will not do, avoiding feature sprawl and optimised for judgement, not configuration.',
  },
  {
    title: 'Built to Scale With Complexity',
    explanation: 'Designed for growth, not just early-stage clarity — handles increasing deal volume, team size, and delivery variation without re-platforming as firms mature.',
  },
];

export default function ProductPageProofSignals() {
  return (
    <Section variant="base" padY="md" maxWidth="7xl">
      {/* Part 1: Framing */}
      <SectionHeader
        title="Built for firms that take profit seriously"
        lead="Profitdrive is designed for leaders who want clarity before committing — and systems that hold up as complexity increases."
      />

      {/* Part 2: Proof Signals */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROOF_SIGNALS.map((signal, index) => (
            <Card key={index} elevation="2" hover>
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  color: 'var(--pd-text)',
                }}
              >
                {signal.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: 'var(--pd-text-secondary)',
                  lineHeight: 'var(--pd-font-body-line)',
                }}
              >
                {signal.explanation}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Part 3: Close the Section */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          The result is a system that earns trust early — and continues to hold up as the business evolves.
        </p>
      </div>
    </Section>
  );
}

