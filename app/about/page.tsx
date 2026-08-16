import { Footer } from "@/components/Footer";
import { BrandMonogram, BrandWave, BrandWordmark } from "@/components/BrandMark";

export default function AboutPage() {
  return (
    <main className="page-main about-page" data-header-theme="light">
      <div className="page-index"><span>03 / About</span><span>Est. 2026</span></div>
      <header className="page-hero about-hero"><h1>About</h1></header>
      <section className="about-layout">
        <div className="about-media" role="img" aria-label="TUR1SMO portrait placeholder"><span>Portrait / 001</span><BrandMonogram className="display-monogram" /><small>Replace portrait</small><BrandWave className="about-brand-wave" /></div>
        <div className="about-copy">
          <p className="eyebrow about-brand-eyebrow"><BrandWordmark /></p>
          <p className="about-lead">Creative practice by a Montreal-based producer and model working across sound, fashion and visual culture.</p>
          <p>The work draws from atmospheric production, soul, contemporary hip-hop, European motorsport and understated design.</p>
          <strong>Sound. Visual. Motion.</strong>
          <dl><div><dt>Location</dt><dd>Montréal, QC</dd></div><div><dt>Disciplines</dt><dd>Production / Modeling / Motion</dd></div><div><dt>Coordinates</dt><dd>45.5019° N</dd></div></dl>
        </div>
      </section>
      <Footer />
    </main>
  );
}
