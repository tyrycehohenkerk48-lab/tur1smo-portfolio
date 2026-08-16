import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="page-main contact-page">
      <div className="page-index"><span>04 / Contact</span><span>Montréal / QC</span></div>
      <header className="page-hero contact-hero"><h1>Contact</h1><p>For sound, image<br />and considered collaborations.</p></header>
      <section className="contact-layout">
        <div className="contact-directory">
          <a href="mailto:music@tur1smo.com"><span>Music / Licensing</span><small>music@tur1smo.com ↗</small></a>
          <a href="mailto:visual@tur1smo.com"><span>Modeling / Creative</span><small>visual@tur1smo.com ↗</small></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><span>Instagram</span><small>@tur1smo ↗</small></a>
          <div><span>Location</span><small>Montréal, QC</small></div>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
