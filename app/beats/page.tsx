import { BeatArchive } from "@/components/BeatList";
import { Footer } from "@/components/Footer";
import { beats, beatGenres, type BeatGenre } from "@/data/beats";
import { BrandWordmark } from "@/components/BrandMark";

type Filter = "all" | BeatGenre;

export default async function BeatsPage({ searchParams }: { searchParams: Promise<{ genre?: string }> }) {
  const query = await searchParams;
  const initialGenre: Filter = beatGenres.includes(query.genre as Filter) ? (query.genre as Filter) : "all";

  return (
    <main className="page-main archive-page">
      <div className="page-index"><span>01 / Sound</span><span className="brand-credit">Produced by <BrandWordmark className="inline-brand" /></span></div>
      <header className="page-hero page-hero-archive"><h1>Beats</h1><p>A working archive of atmospheric production, melody and low light.</p></header>
      <section className="archive-section" aria-label="Beat archive"><BeatArchive initialGenre={initialGenre} items={beats} /></section>
      <Footer />
    </main>
  );
}
