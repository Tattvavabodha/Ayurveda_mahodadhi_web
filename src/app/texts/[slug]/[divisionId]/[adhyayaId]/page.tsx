import { notFound } from "next/navigation";
import { getTextMeta } from "@/lib/content/getTextMeta";
import { getDivisions } from "@/lib/content/getDivisions";
import { getAdhyayas } from "@/lib/content/getAdhyayas";
import { getVerses } from "@/lib/content/getVerses";

/**
 * /texts/[slug]/[divisionId]/[adhyayaId] - the chapter page
 * ---------------------------------------------------------------------
 * Shows every verse in this chapter, one after another, in the exact
 * sequence they were added (see getVerses.ts). Deliberately simple
 * today - just the Sanskrit text and its number - because only the
 * `sanskrit` field has real content so far. The next installment will
 * add padaccheda/anvaya/padartha/etc., and this same page is where
 * they'll be displayed once populated - one new small component per
 * datapoint, same pattern as everywhere else in this project.
 * ---------------------------------------------------------------------
 */
export default function AdhyayaPage({
  params,
}: {
  params: { slug: string; divisionId: string; adhyayaId: string };
}) {
  const result = getTextMeta(params.slug);
  if (!result) notFound();
  const { category, text } = result;

  const divisions = getDivisions(category.categoryId, text.textId);
  const division = divisions.find((d) => d.divisionId === params.divisionId);
  if (!division) notFound();

  const adhyayas = getAdhyayas(category.categoryId, text.textId, division.divisionId);
  const adhyaya = adhyayas.find((a) => a.adhyayaId === params.adhyayaId);
  if (!adhyaya) notFound();

  const verses = getVerses(category.categoryId, text.textId, division.divisionId, adhyaya.adhyayaId);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-center text-sm font-devanagari text-copper mb-1">
        <a href={`/texts/${text.textId}/${division.divisionId}`} className="hover:underline">
          {text.name.sanskrit} · {division.name.sanskrit}
        </a>
      </p>
      <h1 className="font-devanagari text-3xl text-maroon text-center mb-10">
        {adhyaya.name.sanskrit}
      </h1>

      {verses.length === 0 ? (
        <p className="text-center font-serif italic text-text-brown/60">
          Verses for this chapter will appear here soon.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {verses.map((verse) => (
            <div key={verse.id} className="flex gap-4 items-start">
              {verse.displayNumber && (
                <span className="font-devanagari text-copper text-sm shrink-0 w-10 text-right pt-1">
                  {verse.displayNumber}
                </span>
              )}
              <p className="font-devanagari text-lg text-text-brown leading-relaxed">
                {verse.sanskrit}
              </p>
            </div>
          ))}

          {adhyaya.colophon && (
            <p className="font-devanagari text-sm text-text-brown/60 italic text-center mt-8 pt-6 border-t border-sandalwood">
              {adhyaya.colophon}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
