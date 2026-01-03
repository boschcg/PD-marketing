/**
 * Profit Outlook Build-Up Component
 * 
 * Locked content per WO-HERO-003
 * Visual grammar upgrade per WO-HERO-004
 * 
 * Shows illustrative but intentional numbers demonstrating margin asymmetry
 * driven by delivery mix.
 * 
 * Block-based build-up: [Base] + [Lever] + [Lever] → [Outcome]
 * This is a conceptual proof surface that mirrors the app's Outlook logic.
 * Not a live dashboard, not a screenshot, not interactive (for now).
 */

import { BRAND_BLUE, BRAND_GREEN } from '@/lib/brand/tokens';

interface BuildUpBlock {
  label: string;
  value: string;
  type: 'base' | 'lever' | 'outcome';
  isNegative?: boolean;
}

interface BuildUpProps {
  title: string;
  blocks: BuildUpBlock[];
}

function BuildUpBlockComponent({ block }: { block: BuildUpBlock }) {
  const { label, value, type, isNegative } = block;
  
  // Determine styling based on block type
  let valueColor = 'var(--pd-text)';
  let borderWidth = '1px';
  let ringClass = '';
  
  if (type === 'outcome') {
    valueColor = BRAND_BLUE;
    borderWidth = '2px';
    // Add subtle ring for best-case boxes
    ringClass = 'ring-1';
  } else if (type === 'lever') {
    valueColor = BRAND_GREEN;
  } else if (isNegative) {
    valueColor = '#DC2626'; // muted red for negative base
  }
  
  // Apply Level 1 elevation to all cards
  const isOutcome = type === 'outcome';
  
  // Calculate box-shadow for ring effect on outcome blocks
  const boxShadow = isOutcome 
    ? '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 0 0 1px rgba(55, 48, 163, 0.2)'
    : '0 1px 2px 0 rgb(0 0 0 / 0.05)';
  
  return (
    <div
      className="flex flex-col items-center justify-center p-5 rounded-lg bg-white"
      style={{
        border: `${borderWidth} solid ${isOutcome ? BRAND_BLUE : 'var(--pd-border)'}`,
        boxShadow,
        minWidth: '110px',
        width: '100%',
        maxWidth: '140px',
        flex: '1 1 0',
      }}
    >
      <div
        className="text-xs mb-2.5 text-center leading-tight"
        style={{ color: 'var(--pd-text-secondary)' }}
      >
        {label}
      </div>
      <div
        className="text-xl font-semibold font-mono tabular-nums text-center leading-tight"
        style={{ color: valueColor }}
      >
        {value}
      </div>
    </div>
  );
}

function BuildUp({ title, blocks }: BuildUpProps) {
  return (
    <div className="space-y-4">
      <h3
        className="text-xs font-medium text-center"
        style={{ color: 'var(--pd-text-secondary)' }}
      >
        {title}
      </h3>
      
      {/* Horizontal block row - stacks vertically on mobile */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 overflow-x-auto sm:overflow-visible">
        {blocks.map((block, index) => {
          const isFirst = index === 0;
          const isOutcome = block.type === 'outcome';
          
          return (
            <div key={index} className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 flex-shrink-0">
              {/* Operator before block */}
              {!isFirst && (
                <span
                  className="text-xl font-medium flex-shrink-0"
                  style={{
                    color: isOutcome ? BRAND_BLUE : BRAND_GREEN,
                    minWidth: '28px',
                    textAlign: 'center',
                    strokeWidth: '2',
                  }}
                >
                  {isOutcome ? '→' : '+'}
                </span>
              )}
              
              <BuildUpBlockComponent block={block} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfitOutlookBuildUp() {
  // Revenue build-up: Base + Lever + Lever → Outcome
  const revenueBlocks: BuildUpBlock[] = [
    { label: 'Firm revenue', value: 'A$3.85M', type: 'base' },
    { label: 'Extensions', value: '+A$310k', type: 'lever' },
    { label: 'Key deals', value: '+A$420k', type: 'lever' },
    { label: 'Best-case revenue', value: 'A$4.58M', type: 'outcome' },
  ];

  // EBIT build-up: Base + Lever + Lever → Outcome
  const ebitBlocks: BuildUpBlock[] = [
    { label: 'Firm EBIT', value: '-A$70k', type: 'base', isNegative: true },
    { label: 'Extensions', value: '+A$235k', type: 'lever' },
    { label: 'Key deals', value: '+A$160k', type: 'lever' },
    { label: 'Best-case EBIT', value: 'A$325k', type: 'outcome' },
  ];

  return (
    <div className="space-y-8">
      <BuildUp title="Revenue" blocks={revenueBlocks} />
      <BuildUp title="EBIT (Profit)" blocks={ebitBlocks} />
    </div>
  );
}

