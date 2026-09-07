import { Footer } from "@/components/Footer";
import { ReleaseArchive } from "@/components/ReleaseArchive";

export default function ModelingPage() {
  return (
    <main className="page-main modeling-page" data-header-theme="light">
      <ReleaseArchive />
      <div className="page-index"><span>02.2 / Modeling</span><span>Coming soon</span></div>
      <header className="page-hero modeling-hero"><h1 id="modeling-portfolio-title">Modeling</h1><div><p>Selected work<br />Coming soon</p><span>In progress</span></div></header>
      <Footer />
    </main>
  );
}
