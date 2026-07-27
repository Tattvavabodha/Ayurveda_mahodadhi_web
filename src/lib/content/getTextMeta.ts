import { getCategories, CategoryWithTexts } from "./getCategories";
import { TextMeta } from "@/types/text-meta";

/**
 * getTextMeta
 * ---------------------------------------------------------------------
 * Text URLs are just /texts/charaka-samhita - they don't repeat the
 * category (/texts/brihattrayi/charaka-samhita), because a text's
 * category is an organizational detail, not part of its permanent
 * identity. This function is what makes that possible: given just a
 * textId, it searches through every category (via getCategories(),
 * so it stays in sync automatically) and returns the matching text
 * along with which category it belongs to.
 * ---------------------------------------------------------------------
 */
export function getTextMeta(
  textId: string
): { category: CategoryWithTexts; text: TextMeta } | null {
  const categories = getCategories();

  for (const category of categories) {
    const text = category.texts.find((t) => t.textId === textId);
    if (text) {
      return { category, text };
    }
  }

  return null;
}
