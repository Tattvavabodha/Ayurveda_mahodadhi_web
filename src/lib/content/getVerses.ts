import fs from "fs";
import path from "path";
import { Verse } from "@/types/verse";

/**
 * getVerses
 * ---------------------------------------------------------------------
 * Reads every verse-NNN.json file inside one adhyaya's verses/ folder,
 * in filename order (verse-001, verse-002, ...) - which is exactly
 * the reading sequence, since files are zero-padded and named in
 * order. Chapters with no verses/ folder yet return an empty list.
 * ---------------------------------------------------------------------
 */
export function getVerses(
  categoryId: string,
  textId: string,
  divisionId: string,
  adhyayaId: string
): Verse[] {
  const versesPath = path.join(
    process.cwd(),
    "content",
    "texts",
    categoryId,
    textId,
    divisionId,
    adhyayaId,
    "verses"
  );

  if (!fs.existsSync(versesPath)) {
    return [];
  }

  const files = fs
    .readdirSync(versesPath)
    .filter((f) => f.endsWith(".json"))
    .sort(); // "verse-001.json" < "verse-002.json" ... sorts correctly as text

  return files.map(
    (file) => JSON.parse(fs.readFileSync(path.join(versesPath, file), "utf-8")) as Verse
  );
}
