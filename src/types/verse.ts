/**
 * Verse
 * ---------------------------------------------------------------------
 * Today, only `sanskrit` and the identifying fields are populated -
 * matching this milestone's "structure and raw text first" approach.
 * The remaining fields (padaccheda, anvaya, padartha, saralartha,
 * padavyakaranam, chandas, audio, commentaries) are already declared
 * here, all optional, exactly per the Phase 2 schema design - so when
 * we add them in the next installment, no type change is needed here,
 * only new keys in the verse JSON files themselves.
 * ---------------------------------------------------------------------
 */
export interface Verse {
  id: string;
  verseNumber: string;
  displayNumber: string;
  textId: string;
  divisionId: string;
  adhyayaId: string;
  sanskrit: string;

  transliteration?: string;
  padaccheda?: string;
  anvaya?: string;
  padartha?: { pada: string; meaning: string }[];
  saralartha?: {
    sanskrit?: string;
    hindi?: string;
    english?: string;
  };
  padavyakaranam?: { pada: string; grammar: string }[];
  chandas?: {
    name: string;
    explanation?: string;
  };
  audio?: {
    url: string;
    reciter?: string;
    duration?: number;
  };
  commentaries?: {
    commentaryId: string;
    commentator?: string;
    text: string;
  }[];

  meta: {
    status: "draft" | "verified";
    contributors: string[];
    lastUpdated: string;
    tags: string[];
  };
}
