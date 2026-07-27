# आयुर्वेदमहोदधिः - Web Project

This is the Next.js website for the आयुर्वेदमहोदधिः digital Ayurveda
knowledge platform.

## Current status (Milestone: Homepage)

This project currently contains only the homepage, built and approved
through Phases 1-5 of our planning process. It is a real, working
Next.js project - not a mockup.

## How to run this on your own computer

You will need [Node.js](https://nodejs.org) installed (version 18 or
later) and an internet connection (to download the required libraries).

1. Open a terminal in this folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the local development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:3000` - you should see the
   homepage.

## What's still placeholder (intentionally, explained in chat)

- **Search bar**: currently searches a tiny hardcoded example list, to
  demonstrate the interaction. Will be connected to the real search
  index once verse content and `lib/search/` are built.

## Folder structure

See our architecture discussion - in short:
- `src/app/` - pages and routes
- `src/components/` - reusable UI building blocks
- `src/lib/` - data-fetching and search logic (to be filled in soon)
- `src/styles/theme.ts` - central design tokens
- `content/` - (not yet created) will hold the GitHub knowledge repository
