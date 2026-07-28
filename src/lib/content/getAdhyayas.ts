import fs from "fs";
import path from "path";
import { AdhyayaMeta } from "@/types/adhyaya-meta";

/**
 * getAdhyayas
 * ---------------------------------------------------------------------
 * Given a category, text, and division (e.g. "brihattrayi",
 * "ashtanga-hridaya", "sutrasthana"), reads every adhyaya-meta.json
 * inside that division's folder and returns them sorted by order.
 * Divisions with no adhyaya folders yet (everything except
 * Sutrasthana today) simply return an empty list.
 * ---------------------------------------------------------------------
 */
export function getAdhyayas(
  categoryId: string,
  textId: string,
  divisionId: string
): AdhyayaMeta[] {
  const divisionPath = path.join(
    process.cwd(),
    "content",
    "texts",
    categoryId,
    textId,
    divisionId
  );

  if (!fs.existsSync(divisionPath)) {
    return [];
  }

  const entries = fs
    .readdirSync(divisionPath, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  const adhyayas: AdhyayaMeta[] = entries
    .map((entry) => {
      const metaPath = path.join(divisionPath, entry.name, "adhyaya-meta.json");
      if (!fs.existsSync(metaPath)) return null;
      return JSON.parse(fs.readFileSync(metaPath, "utf-8")) as AdhyayaMeta;
    })
    .filter((a): a is AdhyayaMeta => a !== null)
    .sort((a, b) => a.order - b.order);

  return adhyayas;
}
