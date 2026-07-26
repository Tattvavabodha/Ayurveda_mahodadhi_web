import type { Config } from "tailwindcss";

// This file teaches Tailwind CSS our project's own design vocabulary.
// Instead of using generic Tailwind colors like "bg-blue-500" everywhere,
// we can now write "bg-parchment" or "text-maroon" - names that mean
// something specific to THIS project. This is what keeps the whole site's
// look centrally controlled and easy to redesign later (see Phase 2
// discussion on how easy re-theming is).

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        parchment: "#F3EBDD",
        ivory: "#FDF9F0",

        // Text & headings
        "text-brown": "#4A3B2A",
        maroon: "#7A1F1F",

        // Accents
        copper: "#B5652D",
        "forest-green": "#3A5A40",
        "soft-gold": "#C9A34E",

        // Sandalwood - a warm neutral used for borders/dividers
        sandalwood: "#D9C7A3",
      },
      fontFamily: {
        // Devanagari + matching Latin serif, for the manuscript feel
        devanagari: ["var(--font-devanagari)", "serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      boxShadow: {
        // A soft, warm-toned "lifted card" shadow (see Phase 4 decision)
        lifted: "0 2px 8px 0 rgba(74, 59, 42, 0.10), 0 1px 2px 0 rgba(74, 59, 42, 0.08)",
        "lifted-hover": "0 8px 20px 0 rgba(74, 59, 42, 0.16), 0 2px 6px 0 rgba(74, 59, 42, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
