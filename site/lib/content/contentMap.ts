/**
 * Explicit route-to-content file mapping
 * Based on docs/PD_Website_Information_Architecture.md
 */

export const CONTENT_MAP = {
  // Main pages
  home: 'content/01_pages/homepage.md',
  product: 'content/01_pages/product_overview.md',
  'how-it-works': 'content/01_pages/maturity_roadmap.md',
  roadmap: 'content/01_pages/maturity_roadmap.md', // Uses maturity_roadmap.md (only roadmap-related file found)
  'early-access': 'content/01_pages/how_to_trial.md', // Primary source per IA
  about: 'content/01_pages/team_vision.md',
  
  // Playbook - narratives directory
  playbook: null, // Index page - lists all narratives
} as const;

/**
 * Allowed content paths (security: prevent arbitrary file reads)
 */
export const ALLOWED_CONTENT_PATHS = [
  'content/01_pages/homepage.md',
  'content/01_pages/product_overview.md',
  'content/01_pages/maturity_roadmap.md',
  'content/01_pages/team_vision.md',
  'content/01_pages/how_to_trial.md',
  'content/01_pages/how_to_adopt_and_buy.md',
  // Playbook narratives
  'content/03_domain_narratives/protect_margins_without_cfo.md',
  'content/03_domain_narratives/narrative_financials.md',
  'content/03_domain_narratives/narrative_people.md',
  'content/03_domain_narratives/narrative_pipeline.md',
  'content/03_domain_narratives/narrative_projects.md',
  'content/03_domain_narratives/persona_ceo_founder.md',
  'content/03_domain_narratives/persona_ops_delivery.md',
] as const;

/**
 * Get content file path for a route
 */
export function getContentPath(route: keyof typeof CONTENT_MAP): string | null {
  return CONTENT_MAP[route] || null;
}

/**
 * Check if a path is allowed
 */
export function isAllowedPath(path: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ALLOWED_CONTENT_PATHS.includes(path as any);
}

