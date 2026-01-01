/**
 * Content metadata schema
 * All fields are optional to support existing files that may lack frontmatter
 */
export interface ContentMeta {
  title?: string;
  description?: string;
  excerpt?: string;
  order?: number;
  slug?: string;
  category?: string;
  updated?: string; // ISO date string
  canonical?: string; // Canonical URL or path
}

/**
 * Full content entry with metadata and rendered content
 */
export interface ContentEntry {
  meta: ContentMeta;
  filePath: string;
  content: string; // Raw markdown content
  contentHtml: string; // Rendered HTML
  wordCount: number;
  readTimeMin: number;
  toc?: Array<{ id: string; text: string; level: 2 | 3 }>;
}

/**
 * Route key type for page content
 */
export type RouteKey = 'home' | 'product' | 'how-it-works' | 'roadmap' | 'early-access' | 'about';

