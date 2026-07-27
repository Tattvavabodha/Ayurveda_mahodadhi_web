import fs from "fs";
import path from "path";
import { CategoryMeta } from "@/types/category-meta";
import { TextMeta } from "@/types/text-meta";

/**
 * getCategories
 * ---------------------------------------------------------------------
 * This is the function referenced in our earlier code comment - the
 * one that turns "hardcoded navigation" into "content-driven
 * navigation". Here's exactly what it does, in plain terms:
 *
 *   1. Look inside content/texts/ - see whatever category folders
 *      actually exist (today: 4; in future, however many you add).
 *   2. For each category folder, read its category-meta.json (its
 *      Devanagari name + display order).
 *   3. Inside that category folder, look at whatever TEXT folders
 *      actually exist, and read each one's text-meta.json.
 *   4. Sort everything by its "order" field, and return the result.
 *
 * Because this function reads the FOLDERS THEMSELVES (not a hardcoded
 * list), adding a 13th text later means: create one new folder with
 * one text-meta.json file. This function will find it automatically,
 * with zero code changes - exactly the promise from Phase 3.
 *
 * WHY THIS FILE CAN USE "fs" (reading the hard drive) SAFELY:
 * This function only ever runs on the SERVER (during the website's
 * build process, or on the server for each request) - never in a
 * visitor's browser. Next.js enforces this automatically: if a
 * "use client" component (like our Header or RightNavDrawer) ever
 * tried to import this file directly, the project would fail to
 * build - a safety net that prevents this from accidentally leaking
 * into browser code.
 * ---------------------------------------------------------------------
 */

export type CategoryWithTexts = CategoryMeta & { texts: TextMeta[] };

const CONTENT_ROOT = path.join(process.cwd(), "content", "texts");

export function getCategories(): CategoryWithTexts[] {
  // If the content folder doesn't exist yet for some reason, fail
  // gracefully with an empty list rather than crashing the build.
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  const categoryFolders = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const categories: CategoryWithTexts[] = categoryFolders.map((categoryFolder) => {
    const categoryPath = path.join(CONTENT_ROOT, categoryFolder);
    const categoryMeta: CategoryMeta = JSON.parse(
      fs.readFileSync(path.join(categoryPath, "category-meta.json"), "utf-8")
    );

    const textFolders = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const texts: TextMeta[] = textFolders
      .map((textFolder) => {
        const textMetaPath = path.join(categoryPath, textFolder, "text-meta.json");
        if (!fs.existsSync(textMetaPath)) return null;
        return JSON.parse(fs.readFileSync(textMetaPath, "utf-8")) as TextMeta;
      })
      .filter((text): text is TextMeta => text !== null)
      .sort((a, b) => a.order - b.order);

    return { ...categoryMeta, texts };
  });

  return categories.sort((a, b) => a.order - b.order);
}
