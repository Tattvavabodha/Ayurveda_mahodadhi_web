import { notFound } from "next/navigation";
import { getCategories } from "@/lib/content/getCategories";
import { getTextMeta } from "@/lib/content/getTextMeta";
import { getDivisions } from "@/lib/content/getDivisions";
import Card from "@/components/ui/Card";

/**
 * /texts/[slug] - one page template, two possible views
 * ---------------------------------------------------------------------
 * A technical note worth understanding: category slugs (e.g.
 * "brihattrayi") and text slugs (e.g. "charaka-samhita") both sit
 * directly under /texts/, so they share the exact same URL position.
 * Next.js requires a single dynamic segment name at each position, so
 * instead of two separate route files, this ONE file checks which
 * kind of slug it received and renders the appropriate view:
 *
 *   /texts/brihattrayi       -> slug matches a CATEGORY -> show its texts
 *   /texts/charaka-samhita   -> slug matches a TEXT      -> show its sthanas
 *
 * generateStaticParams below tells Next.js to pre-build a page for
 * every category AND every text that exists in the content
 * repository - both are just entries in the same list of slugs.
 * ---------------------------------------------------------------------
 */

export function generateStaticParams() {
  const categories = getCategories();
  const categorySlugs = categories.map((c) => ({ slug: c.categoryId }));
  const textSlugs = categories.flatMap((c) => c.texts.map((t) => ({ slug: t.textId })));
  return [...categorySlugs, ...textSlugs];
}

export default function TextsSlugPage({ params }: { params: { slug: string } }) {
  const categories = getCategories();
  const category = categories.find((c) => c.categoryId === params.slug);

  if (category) {
    return <CategoryView category={category} />;
  }

  const textResult = getTextMeta(params.slug);
  if (textResult) {
    return <TextView category={textResult.category} text={textResult.text} />;
  }

  notFound();
}

/** View shown for a CATEGORY slug (e.g. /texts/brihattrayi) */
function CategoryView({ category }: { category: ReturnType<typeof getCategories>[number] }) {
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
            <a key={text.textId} href={`/texts/${text.textId}`} className="block">
              <Card className="px-6 py-6 h-full">
                <p className="font-devanagari text-xl text-maroon">{text.name.sanskrit}</p>
                <p className="text-sm text-text-brown/70 font-serif mt-1">
                  {text.name.english}
                  {text.author ? ` — ${text.author}` : ""}
                </p>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/** View shown for a TEXT slug (e.g. /texts/charaka-samhita) */
function TextView({
  category,
  text,
}: {
  category: ReturnType<typeof getCategories>[number];
  text: ReturnType<typeof getCategories>[number]["texts"][number];
}) {
  const divisions = getDivisions(category.categoryId, text.textId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-center text-sm font-devanagari text-copper mb-2">
        <a href={`/texts/${category.categoryId}`} className="hover:underline">
          {category.name.sanskrit}
        </a>
      </p>
      <h1 className="font-devanagari text-4xl text-maroon text-center mb-1">
        {text.name.sanskrit}
      </h1>
      <p className="text-center text-text-brown/60 font-serif text-sm mb-10">
        {text.name.english}
        {text.author ? ` — ${text.author}` : ""}
      </p>

      {divisions.length === 0 ? (
        <p className="text-center font-serif italic text-text-brown/60">
          {text.divisionLabel?.sanskrit ?? "Divisions"} will appear here soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {divisions.map((division) => (
            <a key={division.divisionId} href={`/texts/${text.textId}/${division.divisionId}`}>
              <Card className="px-6 py-5 text-center">
                <p className="font-devanagari text-xl text-maroon">{division.name.sanskrit}</p>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
