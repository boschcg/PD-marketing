import Link from 'next/link';
import NavLink from './NavLink';
import { t, Locale } from '@/lib/i18n';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href={`/${locale}`} 
            className="text-lg font-semibold text-gray-900 no-underline"
          >
            {t(locale, 'brand.wordmark')}
          </Link>
          
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
          
          {/* Mobile menu button - basic implementation */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
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
    </header>
  );
}

