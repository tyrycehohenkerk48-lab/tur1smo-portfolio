import Link from "next/link";
import { BeatList } from "@/components/BeatList";
import { Footer } from "@/components/Footer";
import { getFeaturedBeats } from "@/data/beats";
import { BrandMonogram, BrandWave, BrandWordmark } from "@/components/BrandMark";

export default function Home() {
  return (
    <main>
      <section className="hero" data-header-theme="dark" aria-labelledby="hero-title">
        <div className="hero-wash" aria-hidden="true"><span>MEDIA / 001</span><BrandMonogram className="display-monogram" /></div>
        <BrandWave className="hero-signal-wave" />
        <div className="hero-topline"><span>Montréal / QC</span><span>45.5019° N</span></div>
        <div className="hero-main">
          <p className="eyebrow">Sound / Visual / Direction</p>
          <h1 id="hero-title">
            <BrandWordmark className="hero-wordmark" />
          </h1>
          <div className="hero-actions">
            <Link href="/beats">Listen to beats <span aria-hidden="true">↗</span></Link>
            <Link href="/visual/modeling">View portfolio <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-footer"><span>Archive 048-848</span><span>Est. 2026</span></div>
      </section>

      <section className="section selected-sounds" data-header-theme="light" aria-labelledby="selected-title">
        <div className="section-heading"><p>01 / Sound</p><h2 id="selected-title">Selected sounds</h2><span>Montréal, 2026</span></div>
        <BeatList items={getFeaturedBeats()} expandable={false} />
        <div className="section-link"><Link href="/beats">View all <span>→</span></Link></div>
      </section>

      <section className="visual-feature" data-header-theme="dark" aria-labelledby="visual-title">
        <div className="visual-feature-media" role="img" aria-label="TUR1SMO modeling portfolio media placeholder">
          <span>Visual archive / Frame 01</span><BrandMonogram className="display-monogram" /><small>Replace with campaign image</small><BrandWave className="visual-brand-wave" />
        </div>
        <div className="visual-feature-copy">
          <p>02 / Visual</p>
          <h2 id="visual-title">Movement,<br />held still.</h2>
          <p className="visual-text">An evolving portfolio of modeling, fashion, and image-making—shaped by restraint, motion, and atmosphere.</p>
          <Link href="/visual/modeling">Enter modeling archive <span>↗</span></Link>
        </div>
      </section>

      <section className="identity-statement" data-header-theme="light">
        <p>Creative practice by a Montréal-based producer and model working across sound, fashion and visual culture.</p>
        <div><span>Sound.</span><span>Visual.</span><span>Movement.</span></div>
      </section>
      <Footer />
    </main>
  );
}
