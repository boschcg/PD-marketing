import type { Metadata } from 'next';
import { getSiteUrl } from './getSiteUrl';
import type { ContentMeta } from '@/lib/content/types';
import { t } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface BuildMetadataOptions {
  locale: Locale;
  path: string; // e.g., '/en/product' or '/en/playbook/protect-margins-without-cfo'
  meta?: ContentMeta;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Build complete metadata object with canonical, OpenGraph, and Twitter cards
 */
export function buildMetadata({
  locale,
  path,
  meta,
  defaultTitle,
  defaultDescription,
}: BuildMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}${path}`;
  
  // Derive title: meta.title → defaultTitle → fallback
  const title = meta?.title || defaultTitle || 'Profitdrive';
  
  // Derive description: meta.description → meta.excerpt → defaultDescription → fallback
  const description = meta?.description || meta?.excerpt || defaultDescription || 'Commercial decision system for IT & professional services firms';
  
  // Use canonical from meta if present, else use constructed URL
  const canonical = meta?.canonical ? `${siteUrl}${meta.canonical}` : canonicalUrl;
  
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: t(locale, 'meta.siteName'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

