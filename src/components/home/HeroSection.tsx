/**
 * HeroSection
 * ---------------------------------------------------------------------
 * Builds the top of the homepage: the faint manuscript background text,
 * the illustration, and the large Devanagari title.
 *
 * BACKGROUND VERSES:
 * The verses below were provided directly by the project owner, drawn
 * from classical Ayurvedic samhitas (public domain, many centuries
 * old - no copyright concern). They are shown at very low opacity,
 * purely as an atmospheric background layer - not meant to be read
 * word-for-word, which is why readability of the actual page content
 * takes priority (handled by the .manuscript-fade gradient in
 * globals.css). As more verses are catalogued in the real content
 * repository (Phase 2), this list can easily be extended or swapped.
 *
 * HERO ILLUSTRATION:
 * Uses next/image (Next.js's built-in image component) rather than a
 * plain <img> tag - it automatically serves a resized, compressed,
 * lazy-loaded version suited to each visitor's screen, which matters
 * for the "performance" and "image optimisation" goals from the brief.
 * Because the illustration's warm watercolor tones are close to the
 * parchment background color, we give it a defined border and shadow
 * (an "elevation" treatment, same family as our lifted-card style) so
 * it reads as a distinct object sitting on the page, not a smudge that
 * blends into the background.
 * ---------------------------------------------------------------------
 */

import Image from "next/image";

const backgroundVerses = [
  "हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्।\nमानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥",
  "भिषजां साधुवृत्तानां भद्रमागमशालिनाम्।\nअभ्यस्तकर्मणां भद्रं भद्रं भद्राभिलाषिणाम्॥",
  "रागादिरोगान् सततानुषक्तानशेषकायप्रसृतानशेषान्।\nऔत्सुक्यमोहारतिदाञ्जघान योऽपूर्ववैद्याय नमोऽस्तु तस्मै॥",
  "इदमागमसिद्धत्वात् प्रत्यक्षफलदर्शनात्।\nमन्त्रवत्सम्प्रयोक्तव्यं न मीमांस्यं कथञ्चन॥",
  "शस्त्रं शास्त्राणि सलिलं गुणदोषप्रवृत्तये।\nपात्रापेक्षीण्यतः प्रज्ञां बाहुश्रुत्येन बृंहयेत्॥",
  "एकं शास्त्रमधीयानो न विद्याच्छास्त्रनिश्चयम्।\nतस्माद्बहुश्रुतः शास्त्रं विजानीयाच्चिकित्सकः॥",
  "वाक्सौष्ठवेऽर्थविज्ञाने प्रागल्भ्ये कर्मनैपुणे।\nतदभ्यासे च सिद्धौ च यतेताध्ययनान्तगः॥",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden manuscript-fade pt-6 pb-12 px-6">
      {/* Faint repeating background verses */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] select-none pointer-events-none
                   font-devanagari text-sm leading-relaxed text-text-brown
                   flex flex-wrap content-start gap-x-8 gap-y-4 p-6"
      >
        {Array.from({ length: 4 }).flatMap((_, repeatIndex) =>
          backgroundVerses.map((verse, verseIndex) => (
            <p key={`${repeatIndex}-${verseIndex}`} className="whitespace-pre-line w-64">
              {verse}
            </p>
          ))
        )}
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="w-full max-w-md sm:max-w-lg mb-6 rounded-2xl border-2 border-copper/50
                        shadow-lifted-hover overflow-hidden bg-ivory">
          <Image
            src="/images/hero-illustration.png"
            alt="Watercolor illustration of four ancient Indian sages seated together discussing a scholarly topic, with palm-leaf manuscripts before them"
            width={1402}
            height={1122}
            priority
            className="w-full h-auto"
          />
        </div>

        <h1 className="font-devanagari text-5xl sm:text-6xl text-maroon font-semibold tracking-wide">
          ॥आयुर्वेदमहोदधिः॥
        </h1>
      </div>
    </section>
  );
}
