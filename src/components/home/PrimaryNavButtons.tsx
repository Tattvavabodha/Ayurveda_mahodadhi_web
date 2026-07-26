import Card from "@/components/ui/Card";

/**
 * PrimaryNavButtons
 * ---------------------------------------------------------------------
 * The three large entry points into the text hierarchy. Each is built
 * with our shared <Card> component (so they get the lifted-shadow
 * effect automatically), and each links to its own future section page.
 *
 * लघुत्रयी and अन्यग्रन्थाः are marked with a small "coming soon" note
 * (they still link somewhere, but the destination page will say
 * "coming soon" until content exists) - this matches your brief's
 * request to have three buttons now, while only Brhattrayi has real
 * content today.
 * ---------------------------------------------------------------------
 */

const navItems = [
  { label: "बृहत्त्रयी", href: "/texts/brihattrayi", available: true },
  { label: "लघुत्रयी", href: "/texts/laghutrayi", available: false },
  { label: "अन्यग्रन्थाः", href: "/texts/anya-granthah", available: false },
];

export default function PrimaryNavButtons() {
  return (
    <div className="max-w-3xl mx-auto px-6 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
      {navItems.map((item) => (
        <a key={item.href} href={item.href} className="block">
          <Card className="px-6 py-8 text-center">
            <p className="font-devanagari text-2xl text-maroon">{item.label}</p>
            {!item.available && (
              <p className="text-xs text-text-brown/50 font-serif italic mt-2">
                Coming soon
              </p>
            )}
          </Card>
        </a>
      ))}
    </div>
  );
}
