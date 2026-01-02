import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo/getSiteUrl';

/**
 * Generate robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


