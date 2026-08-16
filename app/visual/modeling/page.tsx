import { Footer } from "@/components/Footer";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export default function ModelingPage() {
  return (
    <main className="page-main modeling-page">
      <div className="page-index"><span>02.1 / Modeling</span><span>Montréal / QC</span></div>
      <header className="page-hero modeling-hero"><h1>Modeling</h1><div><p>Selected work<br />2026—ongoing</p><span>Scroll to view</span></div></header>
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
