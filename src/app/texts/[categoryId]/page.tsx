import { notFound } from "next/navigation";
import { getCategories } from "@/lib/content/getCategories";
import Card from "@/components/ui/Card";

/**
 * Category listing page
 * ---------------------------------------------------------------------
 * This is our first real example of "content-driven routing" from
 * Phase 3. The [categoryId] folder name means: this ONE file generates
 * a page for EVERY category that exists in the content repository -
 * /texts/brihattrayi, /texts/laghutrayi, /texts/madhyatrayi, and
 * /texts/anya-granthah are all produced by this single file, using
 * whatever categories getCategories() finds.
 *
 * If you add a 5th category folder to the repository later, a 5th
 * page appears here automatically - no new file needed.
 *
 * `generateStaticParams` tells Next.js, at build time, exactly which
 * category pages to pre-build (turning them into fast, ready-made
 * HTML files rather than building them on-demand for each visitor).
 * ---------------------------------------------------------------------
 */

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ categoryId: category.categoryId }));
}

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categories = getCategories();
  const category = categories.find((c) => c.categoryId === params.categoryId);

  // If someone visits a category slug that doesn't exist in the
  // repository, show a proper 404 page rather than an error.
  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-devanagari text-4xl text-maroon text-center mb-2">
        {category.name.sanskrit}
      </h1>
      <p className="text-center text-text-brown/60 font-serif text-sm mb-10">
        {category.name.english}
      </p>

      {category.texts.length === 0 ? (
        <p className="text-center font-serif italic text-text-brown/60">
          Texts in this category will appear here soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {category.texts.map((text) => (
            <Card key={text.textId} className="px-6 py-6">
              <p className="font-devanagari text-xl text-maroon">{text.name.sanskrit}</p>
              <p className="text-sm text-text-brown/70 font-serif mt-1">
                {text.name.english}
                {text.author ? ` — ${text.author}` : ""}
              </p>
              {text.status === "coming-soon" && (
                <p className="text-xs text-text-brown/50 font-serif italic mt-3">
                  Content coming soon
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
