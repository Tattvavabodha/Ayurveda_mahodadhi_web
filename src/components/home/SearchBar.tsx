"use client";

import { useState } from "react";

/**
 * SearchScope
 * ---------------------------------------------------------------------
 * Describes what portion of the library the search bar should look
 * within. "all" = homepage default (search everything). "category" =
 * scoped to one grouping (e.g. everything under बृहत्त्रयी). "text" =
 * scoped to one specific text (e.g. only चरकसंहिता).
 *
 * Header.tsx computes this automatically from the current page's URL
 * - the person doesn't need to manually pick a filter; simply being
 * on a category or text page IS the filter.
 * ---------------------------------------------------------------------
 */
export type SearchScope =
  | { type: "all" }
  | { type: "category"; label: string; textIds: string[] }
  | { type: "text"; label: string; textId: string };

type SearchBarProps = {
  scope?: SearchScope;
  compact?: boolean;
};

/**
 * SearchBar
 * ---------------------------------------------------------------------
 * WHAT'S REAL vs WHAT'S PLACEHOLDER RIGHT NOW:
 * The actual search "brain" (matching real Sanskrit/transliteration/
 * English verse text) still depends on real verse content and
 * lib/search/, neither of which exist yet - so this still searches a
 * tiny hardcoded example list, same as the original homepage
 * milestone.
 *
 * What IS real starting today: the `scope` prop. Once real search
 * indexing is built, that logic will filter its results using
 * scope.textIds (for a category) or scope.textId (for a single text)
 * - the UI and the "what should I be searching?" logic are already
 * correctly wired, only the underlying index is still a placeholder.
 * ---------------------------------------------------------------------
 */

const exampleData = [
  { id: "1", label: "अष्टाङ्गहृदयम् - सूत्रस्थानम्" },
  { id: "2", label: "आयुष्कामीयाध्यायः" },
  { id: "3", label: "दिनचर्या" },
];

export default function SearchBar({ scope = { type: "all" }, compact = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = exampleData.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const placeholder =
    scope.type === "all"
      ? "Search across the Ayurveda knowledge base..."
      : `Search within ${scope.label}...`;

  return (
    <div className={`relative w-full ${compact ? "max-w-md" : "max-w-2xl mx-auto px-6"}`}>
      <div className="flex items-center gap-2">
        {scope.type !== "all" && (
          <span
            className="hidden sm:inline-flex shrink-0 items-center font-devanagari text-xs
                       text-copper bg-copper/10 px-2.5 py-1.5 rounded-full whitespace-nowrap"
          >
            {scope.label}
          </span>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={placeholder}
          className={`w-full rounded-full bg-ivory border border-sandalwood
                     text-text-brown font-serif placeholder:text-text-brown/50
                     shadow-lifted focus:outline-none focus:ring-2 focus:ring-copper/40
                     transition-shadow ${compact ? "px-4 py-2 text-sm" : "px-6 py-4"}`}
        />
      </div>

      {showSuggestions && query.length > 0 && (
        <ul className="absolute mt-2 w-full bg-ivory border border-sandalwood
                       rounded-2xl shadow-lifted-hover overflow-hidden z-20">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item.id}
                className="px-6 py-3 font-devanagari text-text-brown hover:bg-parchment
                           cursor-pointer transition-colors"
              >
                {item.label}
              </li>
            ))
          ) : (
            <li className="px-6 py-3 text-sm text-text-brown/60 font-serif italic">
              No matches yet - full search index arrives in a later milestone.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
