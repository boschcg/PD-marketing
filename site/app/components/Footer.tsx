import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="bg-slate-50 border-t border-slate-200"
      style={{
        paddingTop: '4rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Product */}
          <div>
            <h3 
              className="text-sm font-medium mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              {t(locale, 'footer.sections.product')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/product`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.productOverview')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/how-it-works`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/roadmap`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.roadmap')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Playbook */}
          <div>
            <h3 
              className="text-sm font-medium mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              {t(locale, 'footer.sections.playbook')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/playbook`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.playbook')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 
              className="text-sm font-medium mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              {t(locale, 'footer.sections.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/about`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/early-access`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.earlyAccess')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 
              className="text-sm font-medium mb-4"
              style={{
                color: 'var(--pd-text)',
              }}
            >
              {t(locale, 'footer.sections.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/privacy`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/terms`} 
                  className="text-sm transition-colors hover:text-[var(--pd-text)]"
                  style={{
                    color: 'var(--pd-text-secondary)',
                  }}
                >
                  {t(locale, 'footer.links.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div 
          className="mt-12 pt-8 border-t"
          style={{
            borderColor: 'var(--pd-border)',
          }}
        >
          <p 
            className="text-xs"
            style={{
              color: 'var(--pd-text-secondary)',
            }}
          >
            {t(locale, 'footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}

