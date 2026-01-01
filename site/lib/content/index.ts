/**
 * Unified content index
 * Scans content directories and provides a single source of truth for all content
 */

import { readdir } from 'fs/promises';
import { join, parse } from 'path';
import { readContentEntry } from './readMarkdown';
import { getSlugFromFilename, getLegacySlug } from './readMarkdown';
import { ALLOWED_CONTENT_PATHS } from './contentMap';
import type { ContentEntry, RouteKey } from './types';
import { CONTENT_MAP } from './contentMap';

// In-memory index cache
let pageIndex: Map<RouteKey, ContentEntry> | null = null;
let playbookIndex: Map<string, ContentEntry> | null = null; // keyed by canonical slug

/**
 * Initialize the content index by scanning directories
 */
async function initializeIndex(): Promise<void> {
  if (pageIndex !== null && playbookIndex !== null) {
    return; // Already initialized
  }

  pageIndex = new Map();
  playbookIndex = new Map();

  const projectRoot = join(process.cwd(), '..');

  // Index pages from content/01_pages
  const pagesDir = join(projectRoot, 'content/01_pages');
  try {
    const pageFiles = await readdir(pagesDir);
    for (const file of pageFiles) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = `content/01_pages/${file}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!ALLOWED_CONTENT_PATHS.includes(filePath as any)) {
        continue;
      }

      try {
        const entry = await readContentEntry(filePath);
        // Find which route key this file maps to
        for (const [routeKey, mappedPath] of Object.entries(CONTENT_MAP)) {
          if (mappedPath === filePath && routeKey !== 'playbook') {
            pageIndex.set(routeKey as RouteKey, entry);
            break;
          }
        }
      } catch (error) {
        console.warn(`Failed to index page ${file}:`, error);
      }
    }
  } catch (error) {
    console.warn(`Failed to scan pages directory:`, error);
  }

  // Index playbook entries from content/03_domain_narratives
  const narrativesDir = join(projectRoot, 'content/03_domain_narratives');
  try {
    const narrativeFiles = await readdir(narrativesDir);
    for (const file of narrativeFiles) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = `content/03_domain_narratives/${file}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!ALLOWED_CONTENT_PATHS.includes(filePath as any)) {
        continue;
      }

      try {
        const entry = await readContentEntry(filePath);
        
        // Generate canonical slug
        const filename = parse(file).name;
        const canonicalSlug = getSlugFromFilename(filename, entry.meta.slug);
        
        playbookIndex.set(canonicalSlug, entry);
      } catch (error) {
        console.warn(`Failed to index playbook entry ${file}:`, error);
      }
    }
  } catch (error) {
    console.warn(`Failed to scan narratives directory:`, error);
  }
}

/**
 * Get a page entry by route key
 */
export async function getPage(routeKey: RouteKey): Promise<ContentEntry | null> {
  await initializeIndex();
  return pageIndex?.get(routeKey) || null;
}

/**
 * List all playbook entries, sorted by order then title
 */
export async function listPlaybookEntries(): Promise<ContentEntry[]> {
  await initializeIndex();
  if (!playbookIndex) return [];

  const entries = Array.from(playbookIndex.values());
  
  // Sort: by order if present, else by title
  return entries.sort((a, b) => {
    const orderA = a.meta.order;
    const orderB = b.meta.order;
    
    if (orderA !== undefined && orderB !== undefined) {
      return orderA - orderB;
    }
    if (orderA !== undefined) return -1;
    if (orderB !== undefined) return 1;
    
    const titleA = a.meta.title || '';
    const titleB = b.meta.title || '';
    return titleA.localeCompare(titleB);
  });
}

/**
 * Resolve a playbook entry by slug (supports both canonical and legacy slugs)
 */
export async function resolvePlaybookBySlug(slug: string): Promise<ContentEntry | null> {
  await initializeIndex();
  if (!playbookIndex) return null;

  // Try canonical slug first
  const entry = playbookIndex.get(slug);
  if (entry) return entry;

  // Try legacy slug (collapsed, no hyphens)
  for (const [, entry] of playbookIndex.entries()) {
    const filename = parse(entry.filePath).name;
    const legacySlug = getLegacySlug(filename);
    if (legacySlug === slug) {
      return entry;
    }
  }

  return null;
}

/**
 * Get canonical slug for a playbook entry
 */
export async function getPlaybookCanonicalSlug(filePath: string): Promise<string | null> {
  await initializeIndex();
  if (!playbookIndex) return null;

  for (const [canonicalSlug, entry] of playbookIndex.entries()) {
    if (entry.filePath === filePath) {
      return canonicalSlug;
    }
  }

  return null;
}

