"use client";

import { useState } from "react";

/**
 * SearchBar
 * ---------------------------------------------------------------------
 * This component handles the VISUAL and INTERACTION behavior of search:
 * typing updates state, and a dropdown of matching suggestions appears.
 *
 * WHAT'S REAL vs WHAT'S PLACEHOLDER RIGHT NOW:
 * The actual search "brain" (reading every verse's Sanskrit,
 * transliteration, and English text, and finding matches instantly)
 * depends on lib/search/searchClient.ts, which in turn depends on
 * real verse content existing in the repository (Phase 2). Since we
 * are only building the homepage shell in this milestone, this
 * component currently searches a tiny hardcoded example list, purely
 * so you can see and test the interaction pattern.
 *
 * In the next milestone (once we wire up real content), we will
 * replace ONLY the `exampleData` array and the `handleChange` search
 * logic below with a call to the real search index - the rest of this
 * component (the input box, the dropdown, the styling) stays exactly
 * the same. This is a good real-world example of building UI ahead of
 * data being ready, in a way that doesn't require a rewrite later.
 * ---------------------------------------------------------------------
 */

const exampleData = [
  { id: "1", label: "अष्टाङ्गहृदयम् - सूत्रस्थानम्" },
  { id: "2", label: "आयुष्कामीयाध्यायः" },
  { id: "3", label: "दिनचर्या" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = exampleData.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-6 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Search across the Ayurveda knowledge base..."
        className="w-full rounded-full bg-ivory border border-sandalwood px-6 py-4
                   text-text-brown font-serif placeholder:text-text-brown/50
                   shadow-lifted focus:outline-none focus:ring-2 focus:ring-copper/40
                   transition-shadow"
      />

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
