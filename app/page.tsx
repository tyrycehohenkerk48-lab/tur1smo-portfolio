import { BeatList } from "@/components/BeatList";
import { Footer } from "@/components/Footer";
import { RouteLink } from "@/components/RouteLink";
import { getFeaturedBeats } from "@/data/beats";

export default function Home() {
  return (
    <main>
      <section className="hero" data-header-theme="dark" aria-labelledby="hero-title">
        <div className="hero-topline"><span>Montréal / Toronto</span><span>45.5019° N</span></div>
        <div className="hero-main">
          <p className="eyebrow hero-disciplines" aria-label="Sound / Visual / Motion">
            <span aria-hidden="true">Sound</span>
            <i aria-hidden="true">/</i>
            <span aria-hidden="true">Visual</span>
            <i aria-hidden="true">/</i>
            <span aria-hidden="true">Motion</span>
          </p>
          <h1 id="hero-title">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- this brand interaction intentionally performs a full homepage refresh */}
            <a className="hero-wordmark-link" href="/" aria-label="Refresh the TUR1SMO homepage">
              <img
                className="hero-wordmark hero-wordmark-image"
                src="/brand/exports/tur1smo-wordmark-paper-hq.png"
                alt=""
                width="8192"
                height="1010"
                fetchPriority="high"
                draggable="false"
              />
            </a>
          </h1>
          <div className="hero-actions">
            <RouteLink href="/beats">Listen to beats <span aria-hidden="true">↗</span></RouteLink>
            <RouteLink href="/visual/modeling">View portfolio <span aria-hidden="true">↗</span></RouteLink>
          </div>
        </div>
        <div className="hero-footer"><span>Archive 048-848</span><span>Est. 2026</span></div>
      </section>

      <section className="section selected-sounds" data-header-theme="light" aria-labelledby="selected-title">
        <div className="section-heading"><p>01 / Sound</p><h2 id="selected-title">Selected sounds</h2><span>Montréal, 2026</span></div>
        <BeatList items={getFeaturedBeats()} expandable={false} />
        <div className="section-link"><RouteLink href="/beats">View all <span>→</span></RouteLink></div>
      </section>

      <section className="visual-feature" data-header-theme="dark" aria-labelledby="visual-title">
        <div className="visual-feature-media" role="img" aria-label="TUR1SMO modeling portfolio media placeholder">
          <span>Visual archive / Frame 01</span><small>Replace with campaign image</small>
        </div>
        <div className="visual-feature-copy">
          <p>02 / Visual</p>
          <h2 id="visual-title">Motion,<br />held still.</h2>
          <p className="visual-text">An evolving portfolio of modeling, fashion, and image-making—shaped by restraint, motion, and atmosphere.</p>
          <RouteLink href="/visual/modeling">Enter modeling archive <span>↗</span></RouteLink>
        </div>
      </section>

      <section className="identity-statement" data-header-theme="light">
        <p>Creative practice by a Montréal-based producer and model working across sound, fashion and visual culture.</p>
        <div><span>Sound.</span><span>Visual.</span><span>Motion.</span></div>
      </section>
      <Footer />
    </main>
  );
}
