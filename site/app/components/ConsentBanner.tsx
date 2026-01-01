'use client';

import { useState } from 'react';
import { t, Locale } from '@/lib/i18n';
import { setConsent, shouldShowConsentBanner } from '@/lib/consent/consent';

interface ConsentBannerProps {
  locale: Locale;
}

export default function ConsentBanner({ locale }: ConsentBannerProps) {
  // Only show if no consent is stored
  const [show] = useState(() => shouldShowConsentBanner());

  const handleAccept = () => {
    setConsent('accepted');
    // Trigger page reload to initialize analytics
    window.location.reload();
  };

  const handleDecline = () => {
    setConsent('declined');
    // Hide banner after decline
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {t(locale, 'consent.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t(locale, 'consent.body')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Privacy link - only show if privacy route exists */}
            {/* TODO: Uncomment when privacy page is implemented
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              {t(locale, 'consent.privacy')}
            </Link>
            */}
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {t(locale, 'consent.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors"
            >
              {t(locale, 'consent.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

