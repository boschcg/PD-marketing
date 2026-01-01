import { readdir } from 'fs/promises';
import { join } from 'path';
import { readMarkdown, getSlugFromFilename, getLegacySlug } from './readMarkdown';
import { ALLOWED_CONTENT_PATHS } from './contentMap';

export interface PlaybookEntry {
  slug: string;
  legacySlug: string; // For backward compatibility redirects
  title: string;
  excerpt?: string;
  filePath: string;
  wordCount: number;
  readTimeMin: number;
  order?: number; // From frontmatter
}

export interface SlugMapping {
  legacySlug: string;
  newSlug: string;
}

/**
 * Get all playbook entries from narratives directory
 */
export async function getPlaybookEntries(): Promise<PlaybookEntry[]> {
  // Content is at ../content from site/
  const projectRoot = join(process.cwd(), '..');
  const narrativesDir = join(projectRoot, 'content/03_domain_narratives');
  const files = await readdir(narrativesDir);
  
  const entries: PlaybookEntry[] = [];
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = `content/03_domain_narratives/${file}`;
    
    // Only process allowed paths
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!ALLOWED_CONTENT_PATHS.includes(filePath as any)) {
      continue;
    }
    
    try {
      const { frontmatter, content } = await readMarkdown(filePath);
      
      // Get title from frontmatter or first heading
      let title = frontmatter?.title as string | undefined;
      if (!title) {
        const firstHeading = content.match(/^#\s+(.+)$/m);
        title = firstHeading ? firstHeading[1].trim() : file.replace(/\.md$/, '');
      }
      
      // Get excerpt from frontmatter or first paragraph (160-220 chars)
      let excerpt = frontmatter?.excerpt as string | undefined;
      if (!excerpt) {
        const firstParagraph = content
          .split('\n\n')
          .find(p => p.trim() && !p.trim().startsWith('#'));
        if (firstParagraph) {
          const trimmed = firstParagraph.trim();
          // Target 160-220 chars, prefer sentence boundary
          if (trimmed.length > 220) {
            const truncated = trimmed.slice(0, 220);
            const lastPeriod = truncated.lastIndexOf('.');
            const lastSpace = truncated.lastIndexOf(' ');
            const cutPoint = lastPeriod > 160 ? lastPeriod + 1 : (lastSpace > 160 ? lastSpace : 220);
            excerpt = trimmed.slice(0, cutPoint).trim();
          } else {
            excerpt = trimmed;
          }
        }
      }
      
      // Calculate word count and read time (average reading speed: 200-250 words/min, use 225)
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      const readTimeMin = Math.max(1, Math.round(wordCount / 225));
      
      // Get order from frontmatter if present
      const order = frontmatter?.order as number | undefined;
      
      const slug = getSlugFromFilename(file, frontmatter?.slug as string | undefined);
      const legacySlug = getLegacySlug(file);
      
      entries.push({
        slug,
        legacySlug,
        title,
        excerpt,
        filePath,
        wordCount,
        readTimeMin,
        order,
      });
    } catch (error) {
      console.warn(`Failed to read playbook entry ${file}:`, error);
      continue;
    }
  }
  
  // Sort: by frontmatter order if present, else by title
  return entries.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Get playbook entry by slug (supports both new and legacy slugs)
 */
export async function getPlaybookEntry(slug: string): Promise<PlaybookEntry | null> {
  const entries = await getPlaybookEntries();
  // Try new slug first
  const entry = entries.find(e => e.slug === slug);
  if (entry) return entry;
  
  // Try legacy slug
  const legacyEntry = entries.find(e => e.legacySlug === slug);
  return legacyEntry || null;
}

/**
 * Get slug mapping for redirects (legacy -> new)
 */
export async function getSlugMappings(): Promise<SlugMapping[]> {
  const entries = await getPlaybookEntries();
  return entries.map(e => ({
    legacySlug: e.legacySlug,
    newSlug: e.slug,
  }));
}

