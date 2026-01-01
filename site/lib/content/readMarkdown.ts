import { readFile } from 'fs/promises';
import { join, parse } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type { Root, Heading, Text, InlineCode } from 'mdast';
import { isAllowedPath } from './contentMap';
import type { ContentMeta, ContentEntry } from './types';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface MarkdownContent {
  frontmatter?: Record<string, unknown>;
  content: string;
  contentHtml: string;
  slug?: string;
  title?: string;
  toc?: TocItem[];
  // New unified format fields
  meta?: ContentMeta;
  wordCount?: number;
  readTimeMin?: number;
}

/**
 * Derive ContentMeta from frontmatter, content, and filename
 * Best-effort: frontmatter → H1 → filename
 */
function deriveContentMeta(
  frontmatter: Record<string, unknown>,
  content: string,
  filePath: string
): ContentMeta {
  const filename = parse(filePath).name;
  
  // Extract title: frontmatter → first H1 → filename-derived
  let title = frontmatter.title as string | undefined;
  if (!title) {
    const firstHeading = content.match(/^#\s+(.+)$/m);
    title = firstHeading ? firstHeading[1].trim() : filename.replace(/[_-]/g, ' ');
  }
  
  // Extract excerpt: frontmatter → first paragraph
  let excerpt = frontmatter.excerpt as string | undefined;
  if (!excerpt) {
    const firstParagraph = content
      .split('\n\n')
      .find(p => p.trim() && !p.trim().startsWith('#'));
    if (firstParagraph) {
      const trimmed = firstParagraph.trim();
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
  
  // Extract description: frontmatter → excerpt (if no description)
  const description = (frontmatter.description as string | undefined) || excerpt;
  
  return {
    title,
    description,
    excerpt,
    order: frontmatter.order as number | undefined,
    slug: frontmatter.slug as string | undefined,
    category: frontmatter.category as string | undefined,
    updated: frontmatter.updated as string | undefined,
    canonical: frontmatter.canonical as string | undefined,
  };
}

/**
 * Read and parse a markdown file
 * @param filePath - Relative path from project root (e.g., 'content/01_pages/homepage.md')
 * @returns Parsed markdown with frontmatter and HTML content
 */
export async function readMarkdown(filePath: string): Promise<MarkdownContent> {
  // Security: only allow whitelisted paths
  if (!isAllowedPath(filePath)) {
    throw new Error(`Path not allowed: ${filePath}`);
  }

  // Read file from project root (content is at ../content from site/)
  const projectRoot = join(process.cwd(), '..');
  const fullPath = join(projectRoot, filePath);
  const fileContents = await readFile(fullPath, 'utf-8');

  // Parse frontmatter
  const { data: frontmatter, content } = matter(fileContents);

  // Generate deterministic slug from text (kebab-case, collision-safe)
  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters except hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Collapse multiple hyphens
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .trim();
  }

  // Extract plain text from heading node (handles emphasis, links, code, etc.)
  function extractHeadingText(node: Heading): string {
    const parts: string[] = [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(node, (child: any) => {
      if (child.type === 'text') {
        parts.push((child as Text).value);
      } else if (child.type === 'inlineCode') {
        parts.push((child as InlineCode).value);
      } else if (child.type === 'strong' || child.type === 'emphasis') {
        // Recursively get text from strong/emphasis nodes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visit(child, (grandchild: any) => {
          if (grandchild.type === 'text') {
            parts.push((grandchild as Text).value);
          } else if (grandchild.type === 'inlineCode') {
            parts.push((grandchild as InlineCode).value);
          }
        });
      } else if (child.type === 'link') {
        // For links, use the link text, not the URL
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        visit(child, (grandchild: any) => {
          if (grandchild.type === 'text') {
            parts.push((grandchild as Text).value);
          }
        });
      }
    });
    
    return parts.join('').trim();
  }

  // Create processor and parse to AST
  const processor = remark().use(remarkGfm);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ast = processor.parse(content) as any;

  // Collect headings and generate TOC
  const toc: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  // First pass: collect headings and generate slugs
  visit(ast, 'heading', (node: Heading) => {
    // Only include H2 and H3
    if (node.depth === 2 || node.depth === 3) {
      const text = extractHeadingText(node);
      if (!text) return;

      const baseSlug = generateSlug(text);
      
      // Handle duplicates by suffixing -2, -3, etc.
      const count = slugCounts.get(baseSlug) || 0;
      slugCounts.set(baseSlug, count + 1);
      
      const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
      
      toc.push({
        id,
        text,
        level: node.depth as 2 | 3,
      });

      // Add ID to heading node via data.hProperties.id
      // This ensures remark-html will include the id attribute
      if (!node.data) {
        node.data = {};
      }
      if (!node.data.hProperties) {
        node.data.hProperties = {};
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node.data.hProperties as any).id = id;
    }
  });

  // Convert AST to HTML (IDs are already in the AST)
  // Use stringify to convert AST back to markdown, then process to HTML
  // Actually, we need to process the AST directly - let's use a custom plugin
  const processedContent = await remark()
    .use(remarkGfm)
    .use(() => {
      // This plugin does nothing, but allows us to process the already-modified AST
      return (tree: Root) => tree;
    })
    .use(remarkHtml)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .process(ast as any);

  const contentHtml = processedContent.toString();

  // Calculate word count and read time
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readTimeMin = Math.max(1, Math.round(wordCount / 225));
  
  // Derive metadata
  const meta = deriveContentMeta(frontmatter, content, filePath);
  
  // Extract common frontmatter fields (for backward compatibility)
  const slug = frontmatter.slug as string | undefined;
  const title = frontmatter.title as string | undefined;

  return {
    frontmatter: Object.keys(frontmatter).length > 0 ? frontmatter : undefined,
    content,
    contentHtml,
    slug,
    title,
    toc: toc.length >= 3 ? toc : undefined, // Only include TOC if 3+ headings
    // New unified format
    meta,
    wordCount,
    readTimeMin,
  };
}

/**
 * Read markdown and return unified ContentEntry format
 */
export async function readContentEntry(filePath: string): Promise<ContentEntry> {
  const result = await readMarkdown(filePath);
  
  return {
    meta: result.meta!,
    filePath,
    content: result.content,
    contentHtml: result.contentHtml,
    wordCount: result.wordCount!,
    readTimeMin: result.readTimeMin!,
    toc: result.toc,
  };
}

/**
 * Convert string to proper kebab-case
 * Examples: "protect_margins_without_cfo" -> "protect-margins-without-cfo"
 *           "narrative_financials" -> "narrative-financials"
 */
function toKebabCase(str: string): string {
  return str
    .replace(/[_\s]+/g, '-') // Replace underscores and spaces with hyphens
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase
    .replace(/[^a-z0-9-]/gi, '') // Remove non-alphanumeric (except hyphens)
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .toLowerCase();
}

/**
 * Get slug from filename or frontmatter
 * Returns proper kebab-case slug
 */
export function getSlugFromFilename(filename: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) {
    // Validate frontmatter slug is kebab-case
    const kebabSlug = toKebabCase(frontmatterSlug);
    if (kebabSlug !== frontmatterSlug) {
      console.warn(`Frontmatter slug "${frontmatterSlug}" is not kebab-case. Using "${kebabSlug}" instead.`);
    }
    return kebabSlug;
  }
  
  // Remove extension and convert to kebab-case
  const baseName = filename.replace(/\.md$/, '');
  return toKebabCase(baseName);
}

/**
 * Generate legacy slug (collapsed, no hyphens) for backward compatibility
 */
export function getLegacySlug(filename: string): string {
  const baseName = filename.replace(/\.md$/, '');
  return baseName
    .replace(/[_\s-]+/g, '') // Remove underscores, spaces, and hyphens
    .replace(/[^a-z0-9]/gi, '') // Remove non-alphanumeric
    .toLowerCase();
}

