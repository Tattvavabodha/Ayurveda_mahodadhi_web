"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import RightNavDrawer from "./RightNavDrawer";
import SearchBar, { SearchScope } from "@/components/home/SearchBar";
import { CategoryWithTexts } from "@/lib/content/getCategories";

type HeaderProps = {
  categories: CategoryWithTexts[];
};

/**
 * resolveScope
 * ---------------------------------------------------------------------
 * Looks at the current URL and figures out "what are we currently
 * looking at?" - the homepage, a whole category, or one specific text
 * - by matching the URL's slug against the real content data. This is
 * the piece that makes search filtering automatic: navigating to
 * /texts/charaka-samhita (from ANYWHERE - a homepage card, the nav
 * drawer, a direct link) always resolves to the same scope, because
 * it's derived from the URL itself, not from how you got there.
 * ---------------------------------------------------------------------
 */
function resolveScope(pathname: string, categories: CategoryWithTexts[]): SearchScope {
  const parts = pathname.split("/").filter(Boolean); // e.g. ["texts", "charaka-samhita"]

  if (parts[0] === "texts" && parts[1]) {
    const slug = parts[1];

    const category = categories.find((c) => c.categoryId === slug);
    if (category) {
      return {
        type: "category",
        label: category.name.sanskrit,
        textIds: category.texts.map((t) => t.textId),
      };
    }

    for (const c of categories) {
      const text = c.texts.find((t) => t.textId === slug);
      if (text) {
        return { type: "text", label: text.name.sanskrit, textId: text.textId };
      }
    }
  }

  return { type: "all" };
}

/**
 * Header
 * ---------------------------------------------------------------------
 * Two distinct looks, depending on the page:
 *
 *  1. HOMEPAGE - minimal: just the ☰ menu button (unchanged from
 *     before). The homepage already has its own large illustration,
 *     title, and search bar in HeroSection.
 *
 *  2. EVERY OTHER PAGE - a compact header (small illustration + title,
 *     acting as a "back to home" link, plus a scoped search bar) that
 *     stays pinned ("sticky") at the top while scrolling.
 * ---------------------------------------------------------------------
 */
export default function Header({ categories }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scope = resolveScope(pathname, categories);

  return (
    <>
      {isHome ? (
        <header className="w-full flex justify-end px-6 py-4 relative z-30">
          <MenuButton onClick={() => setIsDrawerOpen(true)} />
        </header>
      ) : (
        <header
          className="sticky top-0 z-30 w-full bg-parchment/95 backdrop-blur-sm
                     border-b border-sandalwood px-4 sm:px-6 py-3
                     flex items-center gap-4"
        >
          <a
            href="/"
            aria-label="Return to homepage"
            className="flex items-center gap-2 shrink-0 group"
          >
            <Image
              src="/images/hero-illustration.png"
              alt=""
              width={44}
              height={36}
              className="rounded-md border border-copper/40 shadow-lifted object-cover
                         group-hover:opacity-80 transition-opacity"
            />
            <span className="hidden sm:inline font-devanagari text-lg text-maroon whitespace-nowrap">
              आयुर्वेदमहोदधिः
            </span>
          </a>

          <div className="flex-1 flex justify-center min-w-0">
            <SearchBar scope={scope} compact />
          </div>

          <MenuButton onClick={() => setIsDrawerOpen(true)} />
        </header>
      )}

      <RightNavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
      />
    </>
  );
}

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open navigation menu"
      className="flex flex-col justify-center gap-1.5 w-10 h-10 items-center shrink-0
                 rounded-md hover:bg-sandalwood/30 transition-colors"
    >
      <span className="block w-6 h-0.5 bg-text-brown" />
      <span className="block w-6 h-0.5 bg-text-brown" />
      <span className="block w-6 h-0.5 bg-text-brown" />
    </button>
  );
}
