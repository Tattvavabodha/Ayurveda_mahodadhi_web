"use client";

import { CategoryWithTexts } from "@/lib/content/getCategories";

type RightNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryWithTexts[];
};

/**
 * RightNavDrawer
 * ---------------------------------------------------------------------
 * The collapsible navigation panel from our Phase 4 wireframe.
 * Behavior (same on ALL screen sizes, per your decision):
 *   - Hidden by default
 *   - Slides in from the right when opened
 *   - A dimmed "scrim" appears behind it - clicking the scrim closes it
 *
 * CONTENT-DRIVEN NAVIGATION:
 * This component no longer hardcodes categories or texts. It receives
 * `categories` as a prop (fetched in layout.tsx via getCategories()),
 * and simply renders whatever it's given. Add a 13th text to the
 * content repository, and it appears here automatically - no edits
 * to this file required.
 * ---------------------------------------------------------------------
 */
export default function RightNavDrawer({ isOpen, onClose, categories }: RightNavDrawerProps) {
  return (
    <>
      {/* Dimmed background - only rendered/visible when drawer is open */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-text-brown/30 z-40 transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* The sliding panel itself */}
      <aside
        role="dialog"
        aria-label="Site navigation"
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-ivory z-50
                    shadow-lifted-hover transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-5">
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-2xl text-text-brown hover:text-maroon transition-colors"
          >
            &times;
          </button>
        </div>

        <nav className="px-6 pb-8 font-devanagari text-lg text-text-brown space-y-6 overflow-y-auto">
          {categories.map((category) => (
            <NavSection key={category.categoryId} title={category.name.sanskrit}>
              {category.texts.length > 0 ? (
                category.texts.map((text) => (
                  <NavLink key={text.textId} href={`/texts/${text.textId}`}>
                    {text.name.sanskrit}
                  </NavLink>
                ))
              ) : (
                <p className="text-sm text-text-brown/60 font-serif italic pl-2">Coming soon</p>
              )}
            </NavSection>
          ))}

          <div className="pt-4 border-t border-sandalwood">
            <NavLink href="/about">About Us</NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-maroon mb-2">{title}</h3>
      <div className="flex flex-col gap-2 pl-2">{children}</div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="hover:text-copper transition-colors">
      {children}
    </a>
  );
}
