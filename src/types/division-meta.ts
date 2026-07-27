/**
 * DivisionMeta
 * ---------------------------------------------------------------------
 * Mirrors every division-meta.json file (e.g. content/texts/
 * brihattrayi/charaka-samhita/vimanasthana/division-meta.json).
 *
 * Called "division" rather than "sthana" deliberately - as decided in
 * Phase 2, different texts call their major sections different things
 * (sthāna, khaṇḍa, adhyāya directly, etc.). The actual label shown to
 * readers comes from the parent text's text-meta.json divisionLabel
 * field, not from here.
 * ---------------------------------------------------------------------
 */
export interface DivisionMeta {
  divisionId: string;
  textId: string;
  order: number;
  name: {
    sanskrit: string;
    transliteration: string;
  };
}
