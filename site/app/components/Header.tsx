import NavLink from './NavLink';
import BrandWordmark from './BrandWordmark';
import Button from './ui/Button';
import { t, Locale } from '@/lib/i18n';
import { getAppLoginUrl } from '@/lib/config/app-urls';
import Container from './ui/Container';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header 
      className="bg-white border-b border-slate-100"
      style={{
        minHeight: '64px',
        maxHeight: '30vh',
      }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <BrandWordmark locale={locale} size="sm" asLink />
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href={`/${locale}/product`} locale={locale}>
                {t(locale, 'nav.product')}
              </NavLink>
              <NavLink href={`/${locale}/how-it-works`} locale={locale}>
                {t(locale, 'nav.howItWorks')}
              </NavLink>
              <NavLink href={`/${locale}/playbook`} locale={locale}>
                {t(locale, 'nav.playbook')}
              </NavLink>
              <NavLink href={`/${locale}/roadmap`} locale={locale}>
                {t(locale, 'nav.roadmap')}
              </NavLink>
              <NavLink href={`/${locale}/early-access`} locale={locale}>
                {t(locale, 'nav.earlyAccess')}
              </NavLink>
              <NavLink href={`/${locale}/about`} locale={locale}>
                {t(locale, 'nav.about')}
              </NavLink>
            </nav>
            
            {/* Top bar right actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                href={getAppLoginUrl()} 
                variant="secondary"
                className="text-sm px-4 py-2"
              >
                Log in
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-[var(--pd-muted)] hover:text-[var(--pd-text)]"
                aria-label={t(locale, 'common.menu')}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

