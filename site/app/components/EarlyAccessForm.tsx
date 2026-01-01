'use client';

import { useState, FormEvent } from 'react';
import { t, Locale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { hasAnalyticsConsent } from '@/lib/consent/consent';

interface EarlyAccessFormProps {
  locale: Locale;
}

interface FormData {
  email: string;
  name: string;
  company: string;
  role: string;
  comment: string;
  website: string; // Honeypot field
}

interface FormErrors {
  email?: string;
}

export default function EarlyAccessForm({ locale }: EarlyAccessFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    role: '',
    comment: '',
    website: '', // Honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Client-side validation
    if (!formData.email.trim()) {
      setErrors({ email: t(locale, 'forms.earlyAccess.email.required') });
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ email: t(locale, 'forms.earlyAccess.email.invalid') });
      return;
    }

    // Honeypot check (should be empty)
    if (formData.website.trim()) {
      // Bot detected, silently fail
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          name: formData.name.trim() || undefined,
          company: formData.company.trim() || undefined,
          role: formData.role || undefined,
          comment: formData.comment.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (response.status === 429) {
          setSubmitStatus('error');
          // Rate limit error message is already in the error state
          return;
        }
        throw new Error(data.message || 'Submission failed');
      }

      // Success
      setSubmitStatus('success');
      
      // Track analytics event (consent-gated, no PII)
      if (hasAnalyticsConsent()) {
        trackEvent('early_access_submit', {
          role: formData.role || 'not_provided',
          hasCompany: !!formData.company.trim(),
        });
      }

      // Reset form
      setFormData({
        email: '',
        name: '',
        company: '',
        role: '',
        comment: '',
        website: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-base text-gray-900 font-medium">
          {t(locale, 'forms.earlyAccess.success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
      {/* Honeypot field (hidden from users) */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      {/* Email (required) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
          {t(locale, 'forms.earlyAccess.email.label')} <span className="text-gray-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={t(locale, 'forms.earlyAccess.email.placeholder')}
          className={`w-full px-4 py-2 border rounded-lg text-base ${
            errors.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          } focus:outline-none focus:ring-1`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Name (optional) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
          {t(locale, 'forms.earlyAccess.name.label')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t(locale, 'forms.earlyAccess.name.placeholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
        />
      </div>

      {/* Company (optional) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
          {t(locale, 'forms.earlyAccess.company.label')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder={t(locale, 'forms.earlyAccess.company.placeholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
        />
      </div>

      {/* Role (optional dropdown) */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-900 mb-2">
          {t(locale, 'forms.earlyAccess.role.label')}
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
        >
          <option value="">{t(locale, 'forms.earlyAccess.role.placeholder')}</option>
          <option value="founder">{t(locale, 'forms.earlyAccess.role.founder')}</option>
          <option value="finance">{t(locale, 'forms.earlyAccess.role.finance')}</option>
          <option value="ops">{t(locale, 'forms.earlyAccess.role.ops')}</option>
          <option value="sales">{t(locale, 'forms.earlyAccess.role.sales')}</option>
          <option value="other">{t(locale, 'forms.earlyAccess.role.other')}</option>
        </select>
      </div>

      {/* Comment (optional textarea) */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-900 mb-2">
          {t(locale, 'forms.earlyAccess.comment.label')}
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          placeholder={t(locale, 'forms.earlyAccess.comment.placeholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none resize-y"
        />
      </div>

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            {t(locale, 'forms.earlyAccess.error')}
          </p>
        </div>
      )}

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? t(locale, 'forms.earlyAccess.submitting')
            : t(locale, 'forms.earlyAccess.submit')}
        </button>
      </div>
    </form>
  );
}

