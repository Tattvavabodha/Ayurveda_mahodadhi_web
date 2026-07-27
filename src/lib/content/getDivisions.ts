import fs from "fs";
import path from "path";
import { DivisionMeta } from "@/types/division-meta";

/**
 * getDivisions
 * ---------------------------------------------------------------------
 * Given a category and text (e.g. "brihattrayi", "charaka-samhita"),
 * looks inside that text's folder for sub-folders containing a
 * division-meta.json file, reads each one, and returns them sorted by
 * their "order" field.
 *
 * Texts that don't have any division folders yet (like our Laghutrayi/
 * Madhyatrayi/Anya-granthah texts today) simply get an empty array
 * back - the page displaying this will show a friendly "coming soon"
 * message rather than an error. Adding sthana folders to one of those
 * texts later needs no code change here at all.
 * ---------------------------------------------------------------------
 */
export function getDivisions(categoryId: string, textId: string): DivisionMeta[] {
  const textPath = path.join(process.cwd(), "content", "texts", categoryId, textId);

  if (!fs.existsSync(textPath)) {
    return [];
  }

  const entries = fs.readdirSync(textPath, { withFileTypes: true }).filter((e) => e.isDirectory());

  const divisions: DivisionMeta[] = entries
    .map((entry) => {
      const metaPath = path.join(textPath, entry.name, "division-meta.json");
      if (!fs.existsSync(metaPath)) return null;
      return JSON.parse(fs.readFileSync(metaPath, "utf-8")) as DivisionMeta;
    })
    .filter((d): d is DivisionMeta => d !== null)
    .sort((a, b) => a.order - b.order);

  return divisions;
}
