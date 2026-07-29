import { notFound } from "next/navigation";
import { getTextMeta } from "@/lib/content/getTextMeta";
import { getDivisions } from "@/lib/content/getDivisions";
import { getAdhyayas } from "@/lib/content/getAdhyayas";
import { getVerses } from "@/lib/content/getVerses";
import VerseCard from "@/components/verse/VerseCard";

/**
 * /texts/[slug]/[divisionId]/[adhyayaId] - the chapter page
 * ---------------------------------------------------------------------
 * Shows every verse in this chapter, one after another, in sequence
 * (see getVerses.ts). Each verse is rendered by VerseCard, which
 * handles the two-line pada layout and the click-to-expand datapoints
 * (Patha, Avabodha and its sub-sections) - see that component for
 * details. Only the `sanskrit` field has real content so far for most
 * datapoints; VerseCard shows an honest "Not yet added" placeholder
 * for anything still missing.
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
        <div className="flex flex-col">
          {verses.map((verse) => (
            <VerseCard key={verse.id} verse={verse} />
          ))}

          {adhyaya.colophon && (
            <p className="font-devanagari text-lg text-maroon text-center mt-8 pt-6 border-t border-sandalwood">
              {adhyaya.colophon}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
