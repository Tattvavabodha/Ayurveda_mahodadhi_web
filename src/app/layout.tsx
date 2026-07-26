import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Metadata shown in browser tabs and search engine results.
// We'll expand this per-page later (Phase 6+) using Next.js's
// per-page metadata feature, without touching this file.
export const metadata: Metadata = {
  title: "आयुर्वेदमहोदधिः",
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
    <html lang="sa">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
