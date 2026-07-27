/**
 * CategoryMeta
 * ---------------------------------------------------------------------
 * Mirrors the shape of every category-meta.json file in the content
 * repository (e.g. content/texts/brihattrayi/category-meta.json).
 * TypeScript will warn us if our code ever tries to use this data
 * incorrectly (e.g. expecting a field that doesn't exist).
 * ---------------------------------------------------------------------
 */
export interface CategoryMeta {
  categoryId: string;
  name: {
    sanskrit: string;
    transliteration: string;
    english: string;
  };
  order: number;
}
