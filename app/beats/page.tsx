import { BeatArchive } from "@/components/BeatList";
import { Footer } from "@/components/Footer";
import { beats, beatCategories, type BeatCategory } from "@/data/beats";
import { BrandWordmark } from "@/components/BrandMark";

type Filter = "all" | BeatCategory;

export default async function BeatsPage({ searchParams }: { searchParams: Promise<{ category?: string; genre?: string }> }) {
  const query = await searchParams;
  const requestedCategory = query.category ?? query.genre;
  const initialCategory: Filter = beatCategories.includes(requestedCategory as Filter) ? (requestedCategory as Filter) : "all";

  return (
    <main className="page-main archive-page" data-header-theme="light">
      <div className="page-index"><span>01 / Sound</span><span className="brand-credit">Produced by <BrandWordmark className="inline-brand" /></span></div>
      <header className="page-hero page-hero-archive"><h1>Beats</h1><p>A working archive of atmospheric production, melody and low light.</p></header>
      <section className="archive-section" aria-label="Beat archive"><BeatArchive key={initialCategory} initialCategory={initialCategory} items={beats} /></section>
      <Footer />
    </main>
  );
}
