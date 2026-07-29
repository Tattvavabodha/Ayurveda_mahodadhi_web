const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/**
 * toDevanagariNumber
 * ---------------------------------------------------------------------
 * Converts a plain number (1, 2, 30...) into Devanagari numerals
 * (१, २, ३०...). Used anywhere we number things for readers in a way
 * consistent with the site's Sanskrit-manuscript identity - e.g. the
 * adhyaya list ("१. आयुष्कामीयाध्यायः").
 * ---------------------------------------------------------------------
 */
export function toDevanagariNumber(n: number): string {
  return String(n)
    .split("")
    .map((digit) => DEVANAGARI_DIGITS[parseInt(digit, 10)] ?? digit)
    .join("");
}
