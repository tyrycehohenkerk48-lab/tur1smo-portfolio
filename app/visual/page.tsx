import { Footer } from "@/components/Footer";
import { BrandMonogram } from "@/components/BrandMark";
import { RouteLink } from "@/components/RouteLink";

export default function VisualPage() {
  return (
    <main className="page-main visual-page" data-header-theme="dark">
      <div className="page-index"><span>02 / Visual</span><span>Archive 001—008</span></div>
      <header className="page-hero visual-page-hero"><h1>Visual</h1><p>Modeling, image and motion.<br />A study in motion and form.</p></header>
      <section className="visual-category">
        <RouteLink href="/visual/modeling" aria-label="Open modeling portfolio">
          <div className="visual-category-media" role="img" aria-label="Modeling portfolio placeholder"><span>Category / 001</span><BrandMonogram className="display-monogram" /></div>
          <div className="visual-category-title"><span>01</span><h2>Modeling</h2><span>View archive ↗</span></div>
        </RouteLink>
      </section>
      <Footer />
    </main>
  );
}
