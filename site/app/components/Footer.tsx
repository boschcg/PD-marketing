import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 bg-white mt-24">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t(locale, 'footer.sections.product')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/product`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.productOverview')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/how-it-works`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/roadmap`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.roadmap')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Playbook */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t(locale, 'footer.sections.playbook')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/playbook`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.playbook')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t(locale, 'footer.sections.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/early-access`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.earlyAccess')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {t(locale, 'footer.sections.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-gray-600 hover:text-gray-900">
                  {t(locale, 'footer.links.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {t(locale, 'footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}

