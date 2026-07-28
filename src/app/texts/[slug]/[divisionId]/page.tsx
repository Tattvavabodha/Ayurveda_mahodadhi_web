import { notFound } from "next/navigation";
import { getTextMeta } from "@/lib/content/getTextMeta";
import { getDivisions } from "@/lib/content/getDivisions";
import { getAdhyayas } from "@/lib/content/getAdhyayas";
import Card from "@/components/ui/Card";

/**
 * /texts/[slug]/[divisionId] - the sthana/khanda page
 * ---------------------------------------------------------------------
 * [slug] here is always a TEXT (e.g. "ashtanga-hridaya"), never a
 * category - categories don't have divisions. Shows every adhyaya in
 * this division as a card, linking through to the verses once
 * available, or a "coming soon" note otherwise.
 * ---------------------------------------------------------------------
 */
export default function DivisionPage({
  params,
}: {
  params: { slug: string; divisionId: string };
}) {
  const result = getTextMeta(params.slug);
  if (!result) notFound();

  const { category, text } = result;
  const divisions = getDivisions(category.categoryId, text.textId);
  const division = divisions.find((d) => d.divisionId === params.divisionId);
  if (!division) notFound();

  const adhyayas = getAdhyayas(category.categoryId, text.textId, division.divisionId);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-center text-sm font-devanagari text-copper mb-2">
        <a href={`/texts/${text.textId}`} className="hover:underline">
          {text.name.sanskrit}
        </a>
      </p>
      <h1 className="font-devanagari text-3xl text-maroon text-center mb-10">
        {division.name.sanskrit}
      </h1>

      {adhyayas.length === 0 ? (
        <p className="text-center font-serif italic text-text-brown/60">
          Adhyayas in this {text.divisionLabel?.english ?? "division"} will appear here soon.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {adhyayas.map((adhyaya) => {
            const content = (
              <Card className="px-5 py-4 flex items-center justify-between">
                <span className="font-devanagari text-lg text-maroon">{adhyaya.name.sanskrit}</span>
                {adhyaya.status === "coming-soon" && (
                  <span className="text-xs text-text-brown/50 font-serif italic">Coming soon</span>
                )}
              </Card>
            );
            return adhyaya.status === "available" ? (
              <a key={adhyaya.adhyayaId} href={`/texts/${text.textId}/${params.divisionId}/${adhyaya.adhyayaId}`}>
                {content}
              </a>
            ) : (
              <div key={adhyaya.adhyayaId}>{content}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
