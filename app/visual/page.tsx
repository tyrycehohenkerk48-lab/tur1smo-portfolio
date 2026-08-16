import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function VisualPage() {
  return (
    <main className="page-main visual-page">
      <div className="page-index"><span>02 / Visual</span><span>Archive 001—008</span></div>
      <header className="page-hero visual-page-hero"><h1>Visual</h1><p>Modeling, image and direction.<br />A study in movement and form.</p></header>
      <section className="visual-category">
        <Link href="/visual/modeling" aria-label="Open modeling portfolio">
          <div className="visual-category-media" role="img" aria-label="Modeling portfolio placeholder"><span>Category / 001</span><b>T1</b></div>
          <div className="visual-category-title"><span>01</span><h2>Modeling</h2><span>View archive ↗</span></div>
        </Link>
      </section>
      <Footer />
    </main>
  );
}
