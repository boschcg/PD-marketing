interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * SectionHeading component - consistent H2 + optional subtitle styling
 */
export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2
        className="font-bold mb-2"
        style={{
          fontSize: 'var(--pd-font-h2-size)',
          lineHeight: 'var(--pd-font-h2-line)',
          fontWeight: 'var(--pd-font-h2-weight)',
          letterSpacing: 'var(--pd-font-h2-spacing)',
          color: 'var(--pd-text)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[var(--pd-text-secondary)]"
          style={{
            fontSize: 'var(--pd-font-body-size)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

