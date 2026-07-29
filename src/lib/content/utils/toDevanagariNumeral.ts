const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/**
 * toDevanagariNumeral
 * ---------------------------------------------------------------------
 * Converts a plain number (e.g. 12) into its Devanagari digit form
 * (e.g. "१२"), by converting each digit individually. Used wherever
 * we display a count or order number in a Sanskrit-appropriate way.
 * ---------------------------------------------------------------------
 */
export function toDevanagariNumeral(n: number): string {
  return String(n)
    .split("")
    .map((char) => DEVANAGARI_DIGITS[Number(char)] ?? char)
    .join("");
}
