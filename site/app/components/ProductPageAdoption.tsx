import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import Card from './ui/Card';

/**
 * Product Page - What Adoption Looks Like (Week 1 → Steady State)
 * 
 * Per WO-PROD-006
 * 
 * Explains what adoption of Profitdrive actually looks like over time.
 * Reduces perceived implementation risk and sets realistic expectations.
 * 
 * Three parts:
 * 1. Framing: Adoption without disruption
 * 2. Adoption Timeline (3 sequential stages)
 * 3. Close the section
 */

interface AdoptionStage {
  title: string;
  timeframe: string;
  description: string;
}

const ADOPTION_STAGES: AdoptionStage[] = [
  {
    title: 'Initial Clarity',
    timeframe: 'Week 1',
    description: 'Connecting existing data, seeing first forward profit outlook, and identifying obvious margin drivers or risks.',
  },
  {
    title: 'Better Decisions',
    timeframe: 'Weeks 2–4',
    description: 'Using outlook in pricing, staffing, and delivery discussions, testing trade-offs before committing, and fewer late surprises.',
  },
  {
    title: 'Commercial Discipline',
    timeframe: 'Ongoing',
    description: 'Shared assumptions across teams, consistent margin awareness, and confidence as complexity increases.',
  },
];

export default function ProductPageAdoption() {
  return (
    <Section variant="base" padY="md" maxWidth="7xl">
      {/* Part 1: Framing */}
      <SectionHeader
        title="Adoption without disruption"
        lead="Profitdrive is designed to fit into how services firms already operate. Most teams see useful insight quickly, without reworking processes or systems."
      />

      {/* Part 2: Adoption Timeline */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ADOPTION_STAGES.map((stage, index) => (
            <Card key={index} elevation="2" hover>
              <div
                className="text-sm font-medium mb-2"
                style={{
                  color: 'var(--pd-text-secondary)',
                }}
              >
                {stage.timeframe}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  color: 'var(--pd-text)',
                }}
              >
                {stage.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: 'var(--pd-text-secondary)',
                  lineHeight: 'var(--pd-font-body-line)',
                }}
              >
                {stage.description}
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
          Adoption is incremental by design — value appears early and compounds as the business grows.
        </p>
      </div>
    </Section>
  );
}

