import { ReactNode } from "react";

/**
 * DataPoint
 * ---------------------------------------------------------------------
 * One collapsible item - e.g. "पदच्छेदः" or "अन्वयः". Built on the
 * native HTML <details>/<summary> elements rather than React state,
 * which means each datapoint manages its own open/closed state
 * automatically, with zero JavaScript needed for this behavior.
 *
 * `hasContent` controls what shows when opened: real content if the
 * verse actually has this field filled in, or an honest "not yet
 * added" placeholder otherwise - matching the pattern used everywhere
 * else in this project (e.g. "coming soon" on texts/divisions).
 * ---------------------------------------------------------------------
 */
export default function DataPoint({
  label,
  hasContent,
  children,
}: {
  label: string;
  hasContent: boolean;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-sandalwood/60 last:border-b-0">
      <summary
        className="cursor-pointer select-none py-2.5 px-1 font-devanagari text-sm
                   text-text-brown flex items-center justify-between
                   marker:content-none [&::-webkit-details-marker]:hidden"
      >
        <span>{label}</span>
        <span className="text-copper text-xs transition-transform group-open:rotate-90">▶</span>
      </summary>
      <div className="pb-3 px-1 font-serif text-sm text-text-brown/90 leading-relaxed">
        {hasContent ? (
          children
        ) : (
          <p className="italic text-text-brown/50">Not yet added</p>
        )}
      </div>
    </details>
  );
}
