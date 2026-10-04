import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { contactEmail, instagramUrl } from "@/data/contact";

export default function ContactPage() {
  return (
    <main className="page-main contact-page" data-header-theme="light">
      <div className="page-index"><span>04 / Contact</span><span>Montréal / QC</span></div>
      <header className="page-hero contact-hero"><h1>Contact</h1><p>For sound, image<br />and considered collaborations.</p></header>
      <section className="contact-layout">
        <div className="contact-directory">
          <a href={`mailto:${contactEmail}?subject=Music%20%2F%20Licensing`}><span>Music / Licensing</span><small className="brand-address">{contactEmail} ↗</small></a>
          <a href={`mailto:${contactEmail}?subject=Modeling%20%2F%20Creative`}><span>Modeling / Creative</span><small className="brand-address">{contactEmail} ↗</small></a>
          <a href={instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><small className="brand-address">@1tur1smo1 ↗</small></a>
          <div><span>Location</span><small>Montréal, QC</small></div>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
