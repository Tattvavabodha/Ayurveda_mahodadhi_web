/**
 * Footer
 * ---------------------------------------------------------------------
 * Notice this file has NO "use client" line - it doesn't need to react
 * to any clicks or changing state, so it can stay a simple "server
 * component" (rendered once, faster, simpler). A good rule of thumb:
 * only add "use client" when a component truly needs interactivity.
 * ---------------------------------------------------------------------
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-sandalwood py-6 px-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-1 text-sm text-text-brown/70 font-serif text-center">
        <p>A Tattvavabodha Project</p>
        <p>&copy; {currentYear}</p>
      </div>
    </footer>
  );
}
