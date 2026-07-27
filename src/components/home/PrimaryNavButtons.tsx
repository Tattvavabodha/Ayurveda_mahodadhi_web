import Card from "@/components/ui/Card";
import { CategoryWithTexts } from "@/lib/content/getCategories";

type PrimaryNavButtonsProps = {
  categories: CategoryWithTexts[];
};

/**
 * PrimaryNavButtons
 * ---------------------------------------------------------------------
 * The large entry-point cards below the search bar - one per category
 * grouping (बृहत्त्रयी, लघुत्रयी, मध्यत्रयी, अन्यग्रन्थाः today; more
 * later if you ever add another grouping folder).
 *
 * Like RightNavDrawer, this component no longer hardcodes the list -
 * it renders whatever `categories` it's given, read live from the
 * content repository by getCategories(). Each card links to that
 * category's listing page (src/app/texts/[categoryId]/page.tsx),
 * which shows all texts within it.
 * ---------------------------------------------------------------------
 */
export default function PrimaryNavButtons({ categories }: PrimaryNavButtonsProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
      {categories.map((category) => {
        const hasAvailableText = category.texts.some((t) => t.status === "available");
        return (
          <a key={category.categoryId} href={`/texts/${category.categoryId}`} className="block">
            <Card className="px-4 py-8 text-center">
              <p className="font-devanagari text-2xl text-maroon">{category.name.sanskrit}</p>
              {!hasAvailableText && (
                <p className="text-xs text-text-brown/50 font-serif italic mt-2">
                  Coming soon
                </p>
              )}
            </Card>
          </a>
        );
      })}
    </div>
  );
}
