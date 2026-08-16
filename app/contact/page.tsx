import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { BrandWordmark } from "@/components/BrandMark";

export default function ContactPage() {
  return (
    <main className="page-main contact-page">
      <div className="page-index"><span>04 / Contact</span><span>Montréal / QC</span></div>
      <header className="page-hero contact-hero"><h1>Contact</h1><p>For sound, image<br />and considered collaborations.</p></header>
      <section className="contact-layout">
        <div className="contact-directory">
          <a href="mailto:music@tur1smo.com"><span>Music / Licensing</span><small className="brand-address">music@<BrandWordmark className="inline-brand" />.com ↗</small></a>
          <a href="mailto:visual@tur1smo.com"><span>Modeling / Creative</span><small className="brand-address">visual@<BrandWordmark className="inline-brand" />.com ↗</small></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><span>Instagram</span><small className="brand-address">@<BrandWordmark className="inline-brand" /> ↗</small></a>
          <div><span>Location</span><small>Montréal, QC</small></div>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
