"use client";
// "use client" tells Next.js: "this component needs to run in the
// visitor's browser, not just on the server" - required because this
// component responds to clicks (opening the drawer). Most of our
// components WON'T need this line; only interactive ones do.

import { useState } from "react";
import RightNavDrawer from "./RightNavDrawer";

/**
 * Header
 * ---------------------------------------------------------------------
 * A minimal top bar holding just the menu (☰) button. Clicking it opens
 * RightNavDrawer as a slide-in panel (see that file for how the panel
 * itself works). We keep the open/closed state (`isDrawerOpen`) here,
 * in the parent, and pass it down to the drawer - this is a common
 * React pattern: "the button that triggers a change, and the thing
 * that changes, are told about each other by a shared parent."
 * ---------------------------------------------------------------------
 */
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="w-full flex justify-end px-6 py-4 relative z-30">
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation menu"
          className="flex flex-col justify-center gap-1.5 w-10 h-10 items-center
                     rounded-md hover:bg-sandalwood/30 transition-colors"
        >
          <span className="block w-6 h-0.5 bg-text-brown" />
          <span className="block w-6 h-0.5 bg-text-brown" />
          <span className="block w-6 h-0.5 bg-text-brown" />
        </button>
      </header>

      <RightNavDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
