import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Noto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Font loading, done the reliable Next.js way.
 * ---------------------------------------------------------------------
 * Previously we loaded these fonts via a CSS @import in globals.css.
 * That approach had a subtle bug: @import must be the very FIRST rule
 * in a stylesheet, and ours came after the @tailwind directives, so
 * browsers silently ignored it - meaning the font never actually
 * loaded on the live site.
 *
 * next/font/google fixes this properly: Next.js downloads the font
 * files once, at build time, and self-hosts them from our own site.
 * This is both more reliable (no risk of this ordering bug) and
 * faster for visitors (no separate request to Google's servers).
 *
 * The `variable` option below creates a CSS variable (e.g.
 * --font-devanagari) that we can reference anywhere - including in
 * tailwind.config.ts, where "font-devanagari" already points to it.
 * ---------------------------------------------------------------------
 */
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Metadata shown in browser tabs and search engine results.
// We'll expand this per-page later (Phase 6+) using Next.js's
// per-page metadata feature, without touching this file.
export const metadata: Metadata = {
  title: "॥आयुर्वेदमहोदधिः॥",
  description:
    "A scholarly digital Ayurveda knowledge platform - classical texts, commentaries, and word-by-word study tools.",
};

/**
 * RootLayout
 * ---------------------------------------------------------------------
 * Every single page in this website (homepage, and every future text/
 * chapter/verse page) gets wrapped inside this component automatically.
 * That's why Header and Footer live here ONCE - we never need to add
 * them again on any future page we build.
 *
 * {children} is where Next.js will insert whichever specific page
 * the visitor is looking at (e.g. the homepage, or later, a chapter page).
 * ---------------------------------------------------------------------
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sa" className={`${notoSerifDevanagari.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
