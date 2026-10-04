"use client";

import { useState } from "react";
import { contactEmail } from "@/data/contact";

export function ContactForm() {
  const [draftOpened, setDraftOpened] = useState(false);

  return (
    <form className="contact-form" onSubmit={(event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const fields = new FormData(form);
      const interest = form.querySelector<HTMLSelectElement>("#interest")?.selectedOptions[0]?.text ?? "Other";
      const subject = `TUR1SMO — ${interest}`;
      const body = `Name: ${fields.get("name")}\nEmail: ${fields.get("email")}\nInterest: ${interest}\n\n${fields.get("message")}`;
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setDraftOpened(true);
    }}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="interest">I&apos;m interested in</label>
        <select id="interest" name="interest" defaultValue="beat">
          <option value="beat">Beat / Licensing</option>
          <option value="modeling">Modeling</option>
          <option value="creative">Creative project</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-field form-message">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <div className="form-submit">
        <button type="submit">Open email draft <span aria-hidden="true">↗</span></button>
        <p className={draftOpened ? "is-visible" : ""} role="status">Send the draft in your email app. If no draft opened, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </div>
    </form>
  );
}
