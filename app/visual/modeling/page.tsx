import { Footer } from "@/components/Footer";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ReleaseArchive } from "@/components/ReleaseArchive";

export default function ModelingPage() {
  return (
    <main className="page-main modeling-page" data-header-theme="light">
      <ReleaseArchive />
      <div className="page-index"><span>02.2 / Modeling</span><span>Montréal / QC</span></div>
      <header className="page-hero modeling-hero"><h1>Modeling</h1><div><p>Selected work<br />2026—ongoing</p><span>Scroll to view</span></div></header>
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
