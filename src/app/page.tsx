import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import PrimaryNavButtons from "@/components/home/PrimaryNavButtons";

/**
 * Homepage
 * ---------------------------------------------------------------------
 * Notice how short and readable this file is - that's the entire
 * point of breaking the page into components. Anyone looking at this
 * file (even you, without programming experience) can understand the
 * page's structure just by reading these three names: Hero, then
 * Search, then Nav Buttons - matching our Phase 4 wireframe exactly.
 * ---------------------------------------------------------------------
 */
export default function HomePage() {
  return (
    <div className="pb-16">
      <HeroSection />
      <div className="-mt-6">
        <SearchBar />
      </div>
      <PrimaryNavButtons />
    </div>
  );
}
