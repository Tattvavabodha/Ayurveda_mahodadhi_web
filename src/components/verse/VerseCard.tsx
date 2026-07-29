"use client";

import { useState } from "react";
import { Verse } from "@/types/verse";
import DataPoint from "./DataPoint";

type VerseCardProps = {
  verse: Verse;
};

/**
 * splitIntoPadaLines
 * ---------------------------------------------------------------------
 * Our verse text is stored as one continuous string with a single
 * danda (।) separating the first half (pādas 1-2) from the second
 * half (pādas 3-4) - see the transcription note in the project log.
 * This splits it back into the traditional two-line display:
 *   line 1: pādas 1-2, ending in ।
 *   line 2: pādas 3-4, ending in the verse number inside ॥ ॥
 *
 * Single-line verses (like verse 33 or the closing half-verse) simply
 * render as one line, with the same closing convention.
 * ---------------------------------------------------------------------
 */
function splitIntoPadaLines(verse: Verse): { line1: string | null; line2: string } {
  const segments = verse.sanskrit
    .split("।")
    .map((s) => s.trim())
    .filter(Boolean);

  const closing = verse.displayNumber ? ` ॥${verse.displayNumber}॥` : "।";

  if (segments.length <= 1) {
    return { line1: null, line2: (segments[0] ?? "") + closing };
  }

  const line1 = segments[0] + "।";
  const line2 = segments.slice(1).join(" ") + closing;
  return { line1, line2 };
}

export default function VerseCard({ verse }: VerseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { line1, line2 } = splitIntoPadaLines(verse);

  return (
    <div className="border-b border-sandalwood/40 last:border-b-0 pb-4">
      <button
        onClick={() => setIsExpanded((v) => !v)}
        className="w-full text-left flex gap-4 items-start hover:bg-ivory/60 rounded-lg
                   px-2 py-2 -mx-2 transition-colors"
      >
        <span className="flex-1 font-devanagari text-xl sm:text-2xl text-text-brown leading-relaxed">
          {line1 && <span className="block">{line1}</span>}
          <span className="block">{line2}</span>
        </span>
        <span
          className={`text-copper text-sm shrink-0 pt-2 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 mx-2 bg-ivory border border-sandalwood rounded-xl overflow-hidden">
          {/* पाठः - Patha (transliteration + audio) */}
          <div className="px-3 pt-3">
            <p className="font-devanagari text-xs tracking-wide text-copper uppercase mb-1">
              पाठः
            </p>
          </div>
          <div className="px-3">
            <DataPoint label="IAST Transliteration" hasContent={Boolean(verse.transliteration)}>
              <p>{verse.transliteration}</p>
            </DataPoint>
            <DataPoint label="ऑडियो (Audio)" hasContent={Boolean(verse.audio)}>
              {verse.audio && (
                <audio controls src={verse.audio.url} className="w-full mt-1">
                  Your browser does not support audio playback.
                </audio>
              )}
            </DataPoint>
          </div>

          {/* अवबोधः - Avabodha (grammatical/semantic analysis) */}
          <div className="px-3 pt-4">
            <p className="font-devanagari text-xs tracking-wide text-copper uppercase mb-1">
              अवबोधः
            </p>
          </div>
          <div className="px-3 pb-2">
            <DataPoint label="पदच्छेदः" hasContent={Boolean(verse.padaccheda)}>
              <p>{verse.padaccheda}</p>
            </DataPoint>
            <DataPoint label="अन्वयः" hasContent={Boolean(verse.anvaya)}>
              <p>{verse.anvaya}</p>
            </DataPoint>
            <DataPoint label="पदार्थः" hasContent={Boolean(verse.padartha?.length)}>
              <ul className="space-y-1">
                {verse.padartha?.map((p, i) => (
                  <li key={i}>
                    <span className="font-devanagari text-maroon">{p.pada}</span> — {p.meaning}
                  </li>
                ))}
              </ul>
            </DataPoint>
            <DataPoint label="सरलार्थः (संस्कृतम्)" hasContent={Boolean(verse.saralartha?.sanskrit)}>
              <p className="font-devanagari">{verse.saralartha?.sanskrit}</p>
            </DataPoint>
            <DataPoint label="सरलार्थः (हिंदी)" hasContent={Boolean(verse.saralartha?.hindi)}>
              <p className="font-devanagari">{verse.saralartha?.hindi}</p>
            </DataPoint>
            <DataPoint label="सरलार्थः (English)" hasContent={Boolean(verse.saralartha?.english)}>
              <p>{verse.saralartha?.english}</p>
            </DataPoint>
            <DataPoint label="छन्दः" hasContent={Boolean(verse.chandas)}>
              <p>
                <span className="font-devanagari text-maroon">{verse.chandas?.name}</span>
                {verse.chandas?.explanation ? ` — ${verse.chandas.explanation}` : ""}
              </p>
            </DataPoint>
            <DataPoint label="पदव्याकरणम्" hasContent={Boolean(verse.padavyakaranam?.length)}>
              <ul className="space-y-1">
                {verse.padavyakaranam?.map((p, i) => (
                  <li key={i}>
                    <span className="font-devanagari text-maroon">{p.pada}</span> — {p.grammar}
                  </li>
                ))}
              </ul>
            </DataPoint>
            <DataPoint label="व्याख्यानानि" hasContent={Boolean(verse.commentaries?.length)}>
              <div className="space-y-3">
                {verse.commentaries?.map((c) => (
                  <div key={c.commentaryId}>
                    {c.commentator && (
                      <p className="font-devanagari text-maroon text-xs mb-1">{c.commentator}</p>
                    )}
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </DataPoint>
          </div>
        </div>
      )}
    </div>
  );
}
