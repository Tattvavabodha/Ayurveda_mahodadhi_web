/**
 * theme.ts
 * ---------------------------------------------------------------------
 * This file is the "single source of truth" for our visual identity.
 *
 * Why does this file exist, if colors are already in tailwind.config.ts?
 * Tailwind's config is what CSS classes are generated FROM. This file
 * is for the few places our TypeScript code needs to know a design
 * value directly (not through a CSS class) - for example, if we ever
 * generate a chart, an SVG, or an email template that can't use
 * Tailwind classes.
 *
 * Whenever someone asks "what colors/fonts does this site use?" -
 * point them here first.
 * ---------------------------------------------------------------------
 */

export const colors = {
  parchment: "#F3EBDD",
  ivory: "#FDF9F0",
  textBrown: "#4A3B2A",
  maroon: "#7A1F1F",
  copper: "#B5652D",
  forestGreen: "#3A5A40",
  softGold: "#C9A34E",
  sandalwood: "#D9C7A3",
} as const;

export const fonts = {
  devanagari: "var(--font-devanagari)",
  serif: "var(--font-serif)",
} as const;

export const siteMeta = {
  titleDevanagari: "आयुर्वेदमहोदधिः",
  projectName: "A Tattvavabodha Project",
} as const;
