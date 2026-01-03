import Section from './layout/Section';
import SectionHeader from './layout/SectionHeader';
import Card from './ui/Card';

/**
 * Product Page - Where Teams Use Profitdrive (Roles & Touchpoints)
 * 
 * Per WO-PROD-005
 * 
 * Explains who uses Profitdrive inside a services firm and how.
 * Makes usage feel practical and non-disruptive.
 * 
 * Three parts:
 * 1. Framing: Used across leadership, finance, and operations
 * 2. Role-Based Usage (3 role blocks)
 * 3. Shared Benefit (closing)
 */

interface RoleBlock {
  title: string;
  description: string;
}

const ROLE_BLOCKS: RoleBlock[] = [
  {
    title: 'Leadership (CEO / Founder / MD)',
    description: 'Forward profit outlook, trade-offs between growth, margin, and capacity, and priority setting before commitments are locked.',
  },
  {
    title: 'Finance (CFO / Finance Lead / Advisor)',
    description: 'Commercial assumptions and margin discipline, alignment between plans and actuals, and reduced manual reconciliation and model rebuilding.',
  },
  {
    title: 'Operations (Delivery / Practice / Ops Leads)',
    description: 'Capacity and utilisation visibility, delivery mix and extensions, and understanding margin impact of staffing choices.',
  },
];

export default function ProductPageRoles() {
  return (
    <Section variant="card" padY="md" maxWidth="7xl">
      <SectionHeader
        title="Used across leadership, finance, and operations"
        lead="Profitdrive is not owned by a single function. It provides a shared commercial view that different roles use in different ways."
      />

      {/* Part 2: Role-Based Usage */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ROLE_BLOCKS.map((role, index) => (
            <Card key={index} hover elevation="2">
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  color: 'var(--pd-text)',
                }}
              >
                {role.title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: 'var(--pd-text-secondary)',
                  lineHeight: 'var(--pd-font-body-line)',
                }}
              >
                {role.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Part 3: Shared Benefit */}
      <div>
        <p
          className="text-lg leading-relaxed max-w-3xl"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          By sharing the same commercial picture, teams make faster, more aligned decisions — without adding process or meetings.
        </p>
      </div>
    </Section>
  );
}

