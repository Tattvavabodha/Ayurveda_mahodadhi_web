import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import PrimaryNavButtons from "@/components/home/PrimaryNavButtons";
import { getCategories } from "@/lib/content/getCategories";

/**
 * Homepage
 * ---------------------------------------------------------------------
 * Notice how short and readable this file is - that's the entire
 * point of breaking the page into components. Anyone looking at this
 * file (even you, without programming experience) can understand the
 * page's structure just by reading these three names: Hero, then
 * Search, then Nav Buttons - matching our Phase 4 wireframe exactly.
 *
 * This page is now `async` so it can read the four category tabs
 * (बृहत्त्रयी, लघुत्रयी, मध्यत्रयी, अन्यग्रन्थाः) directly from the
 * content repository, via the same getCategories() function used by
 * the navigation drawer - one source of truth for both.
 * ---------------------------------------------------------------------
 */
export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="pb-16">
      <HeroSection />
      <div className="-mt-6">
        <SearchBar />
      </div>
      <PrimaryNavButtons categories={categories} />
    </div>
  );
}
