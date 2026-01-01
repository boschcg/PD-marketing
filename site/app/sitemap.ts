import { MetadataRoute } from 'next';
import { listPlaybookEntries } from '@/lib/content/index';
import { getPage } from '@/lib/content/index';
import { getSiteUrl } from '@/lib/seo/getSiteUrl';
import { getSlugFromFilename } from '@/lib/content/readMarkdown';
import { parse } from 'path';
import type { RouteKey } from '@/lib/content/types';

/**
 * Generate sitemap.xml dynamically from content index
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const locale = 'en'; // Only 'en' supported for now
  
  const entries: MetadataRoute.Sitemap = [];
  
  // Static pages
  const staticPages: Array<{ routeKey: RouteKey; path: string }> = [
    { routeKey: 'home', path: `/${locale}` },
    { routeKey: 'product', path: `/${locale}/product` },
    { routeKey: 'how-it-works', path: `/${locale}/how-it-works` },
    { routeKey: 'roadmap', path: `/${locale}/roadmap` },
    { routeKey: 'early-access', path: `/${locale}/early-access` },
    { routeKey: 'about', path: `/${locale}/about` },
  ];
  
  // Add playbook index page
  entries.push({
    url: `${siteUrl}/${locale}/playbook`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  });
  
  // Add static pages
  for (const { routeKey, path } of staticPages) {
    const entry = await getPage(routeKey);
    const url = `${siteUrl}${path}`;
    
    // Use meta.updated if present, else omit lastModified
    const lastModified = entry?.meta.updated ? new Date(entry.meta.updated) : undefined;
    
    entries.push({
      url,
      lastModified,
      changeFrequency: 'monthly',
      priority: routeKey === 'home' ? 1.0 : 0.9,
    });
  }
  
  // Add playbook entries (canonical slugs only)
  const playbookEntries = await listPlaybookEntries();
  for (const entry of playbookEntries) {
    const filename = parse(entry.filePath).name;
    const canonicalSlug = getSlugFromFilename(filename, entry.meta.slug);
    const url = `${siteUrl}/${locale}/playbook/${canonicalSlug}`;
    
    // Use meta.updated if present, else omit lastModified
    const lastModified = entry.meta.updated ? new Date(entry.meta.updated) : undefined;
    
    entries.push({
      url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
  
  return entries;
}

