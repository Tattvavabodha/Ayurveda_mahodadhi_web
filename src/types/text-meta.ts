/**
 * TextMeta
 * ---------------------------------------------------------------------
 * Mirrors the shape of every text-meta.json file (e.g.
 * content/texts/brihattrayi/ashtanga-hridaya/text-meta.json).
 *
 * Note `divisions: string[]` is currently always empty - it will list
 * slugs like "sutrasthana", "sharirasthana" once those folders and
 * their content actually exist. `status` lets the UI show a
 * "coming soon" badge honestly, without needing real content yet.
 * ---------------------------------------------------------------------
 */
export interface TextMeta {
  textId: string;
  categoryId: string;
  order: number;
  name: {
    sanskrit: string;
    transliteration: string;
    english: string;
  };
  author?: string;
  divisionLabel?: {
    sanskrit: string;
    english: string;
  };
  divisions: string[];
  status: "available" | "coming-soon";
}
