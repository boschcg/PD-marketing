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
  companySize: string;
  comment: string;
  website: string; // Honeypot field
}

interface FormErrors {
  email?: string;
  name?: string;
  company?: string;
  role?: string;
  companySize?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  company: boolean;
  role: boolean;
  companySize: boolean;
}

export default function EarlyAccessForm({ locale }: EarlyAccessFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    company: '',
    role: '',
    companySize: '',
    comment: '',
    website: '', // Honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    company: false,
    role: false,
    companySize: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Client-side validation
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t(locale, 'forms.earlyAccess.name.required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t(locale, 'forms.earlyAccess.email.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t(locale, 'forms.earlyAccess.email.invalid');
    }
    
    if (!formData.company.trim()) {
      newErrors.company = t(locale, 'forms.earlyAccess.company.required');
    }
    
    if (!formData.role) {
      newErrors.role = t(locale, 'forms.earlyAccess.role.required');
    }
    
    if (!formData.companySize) {
      newErrors.companySize = t(locale, 'forms.earlyAccess.companySize.required');
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mark all fields as touched when validation fails on submit
      setTouched({
        name: true,
        email: true,
        company: true,
        role: true,
        companySize: true,
      });
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
          name: formData.name.trim(),
          company: formData.company.trim(),
          role: formData.role,
          companySize: formData.companySize,
          comment: formData.comment.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (response.status === 429) {
          setSubmitStatus('error');
          setSubmitError(t(locale, 'forms.earlyAccess.error'));
          setIsSubmitting(false);
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
        companySize: '',
        comment: '',
        website: '',
      });
    } catch {
      setSubmitStatus('error');
      setSubmitError(t(locale, 'forms.earlyAccess.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div 
        className="p-6 rounded-lg border space-y-3"
        style={{
          backgroundColor: 'var(--pd-surface)',
          borderColor: 'var(--pd-border)',
        }}
      >
        <h3 
          className="text-lg font-semibold"
          style={{
            color: 'var(--pd-text)',
          }}
        >
          {t(locale, 'forms.earlyAccess.success.header')}
        </h3>
        <p 
          className="text-base leading-relaxed"
          style={{
            color: 'var(--pd-text-secondary)',
            lineHeight: 'var(--pd-font-body-line)',
          }}
        >
          {t(locale, 'forms.earlyAccess.success.message')}
        </p>
        <p 
          className="text-sm leading-relaxed"
          style={{
            color: 'var(--pd-text-secondary)',
          }}
        >
          {t(locale, 'forms.earlyAccess.success.secondary')}
        </p>
        <div className="pt-2">
          <a
            href={`/${locale}/product`}
            className="text-sm underline"
            style={{
              color: 'var(--pd-text-secondary)',
            }}
          >
            {t(locale, 'forms.earlyAccess.success.backToProduct')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

      {/* Name (required) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
          {t(locale, 'forms.earlyAccess.name.label')} <span style={{ color: 'var(--pd-text-secondary)' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) {
              setErrors({ ...errors, name: undefined });
            }
          }}
          onBlur={() => setTouched({ ...touched, name: true })}
          placeholder={t(locale, 'forms.earlyAccess.name.placeholder')}
          className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-1 ${
            errors.name && touched.name
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          }`}
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
          aria-invalid={errors.name && touched.name ? 'true' : 'false'}
          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
        />
        {errors.name && touched.name && (
          <p id="name-error" className="mt-1 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Work Email (required) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
          {t(locale, 'forms.earlyAccess.email.label')} <span style={{ color: 'var(--pd-text-secondary)' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) {
              setErrors({ ...errors, email: undefined });
            }
          }}
          onBlur={() => setTouched({ ...touched, email: true })}
          placeholder={t(locale, 'forms.earlyAccess.email.placeholder')}
          className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-1 ${
            errors.email && touched.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          }`}
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
          aria-invalid={errors.email && touched.email ? 'true' : 'false'}
          aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
        />
        {errors.email && touched.email && (
          <p id="email-error" className="mt-1 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Company (required) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
          {t(locale, 'forms.earlyAccess.company.label')} <span style={{ color: 'var(--pd-text-secondary)' }}>*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={(e) => {
            setFormData({ ...formData, company: e.target.value });
            if (errors.company) {
              setErrors({ ...errors, company: undefined });
            }
          }}
          onBlur={() => setTouched({ ...touched, company: true })}
          placeholder={t(locale, 'forms.earlyAccess.company.placeholder')}
          className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-1 ${
            errors.company && touched.company
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          }`}
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
          aria-invalid={errors.company && touched.company ? 'true' : 'false'}
          aria-describedby={errors.company && touched.company ? 'company-error' : undefined}
        />
        {errors.company && touched.company && (
          <p id="company-error" className="mt-1 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
            {errors.company}
          </p>
        )}
      </div>

      {/* Role (required dropdown) */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
          {t(locale, 'forms.earlyAccess.role.label')} <span style={{ color: 'var(--pd-text-secondary)' }}>*</span>
        </label>
        <select
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={(e) => {
            setFormData({ ...formData, role: e.target.value });
            if (errors.role) {
              setErrors({ ...errors, role: undefined });
            }
          }}
          onBlur={() => setTouched({ ...touched, role: true })}
          className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-1 ${
            errors.role && touched.role
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          }`}
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
          aria-invalid={errors.role && touched.role ? 'true' : 'false'}
          aria-describedby={errors.role && touched.role ? 'role-error' : undefined}
        >
          <option value="">{t(locale, 'forms.earlyAccess.role.placeholder')}</option>
          <option value="leadership">{t(locale, 'forms.earlyAccess.role.leadership')}</option>
          <option value="finance">{t(locale, 'forms.earlyAccess.role.finance')}</option>
          <option value="operations">{t(locale, 'forms.earlyAccess.role.operations')}</option>
          <option value="advisor">{t(locale, 'forms.earlyAccess.role.advisor')}</option>
          <option value="other">{t(locale, 'forms.earlyAccess.role.other')}</option>
        </select>
        {errors.role && touched.role && (
          <p id="role-error" className="mt-1 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
            {errors.role}
          </p>
        )}
      </div>

      {/* Company Size (required dropdown) */}
      <div>
        <label htmlFor="companySize" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
          {t(locale, 'forms.earlyAccess.companySize.label')} <span style={{ color: 'var(--pd-text-secondary)' }}>*</span>
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          value={formData.companySize}
          onChange={(e) => {
            setFormData({ ...formData, companySize: e.target.value });
            if (errors.companySize) {
              setErrors({ ...errors, companySize: undefined });
            }
          }}
          onBlur={() => setTouched({ ...touched, companySize: true })}
          className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-1 ${
            errors.companySize && touched.companySize
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'
          }`}
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
          aria-invalid={errors.companySize && touched.companySize ? 'true' : 'false'}
          aria-describedby={errors.companySize && touched.companySize ? 'companySize-error' : undefined}
        >
          <option value="">{t(locale, 'forms.earlyAccess.companySize.placeholder')}</option>
          <option value="1-10">{t(locale, 'forms.earlyAccess.companySize.1-10')}</option>
          <option value="11-30">{t(locale, 'forms.earlyAccess.companySize.11-30')}</option>
          <option value="31-75">{t(locale, 'forms.earlyAccess.companySize.31-75')}</option>
          <option value="76-150">{t(locale, 'forms.earlyAccess.companySize.76-150')}</option>
          <option value="150+">{t(locale, 'forms.earlyAccess.companySize.150+')}</option>
        </select>
        {errors.companySize && touched.companySize && (
          <p id="companySize-error" className="mt-1 text-sm" style={{ color: 'var(--pd-text-secondary)' }}>
            {errors.companySize}
          </p>
        )}
      </div>

      {/* What prompted your interest? (optional textarea) */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2" style={{ color: 'var(--pd-text)' }}>
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
          style={{
            color: 'var(--pd-text)',
            backgroundColor: 'var(--pd-surface)',
          }}
        />
      </div>

      {/* Submission error message */}
      {submitStatus === 'error' && submitError && (
        <div 
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: 'var(--pd-surface)',
            borderColor: 'var(--pd-border)',
          }}
        >
          <p 
            className="text-sm"
            style={{
              color: 'var(--pd-text-secondary)',
            }}
          >
            {submitError}
          </p>
        </div>
      )}

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--brand-blue)',
            color: 'white',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          {isSubmitting
            ? t(locale, 'forms.earlyAccess.submitting')
            : t(locale, 'forms.earlyAccess.submit')}
        </button>
      </div>
    </form>
    </div>
  );
}

