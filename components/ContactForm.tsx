"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
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
        <button type="submit">Send <span aria-hidden="true">↗</span></button>
        <p className={sent ? "is-visible" : ""} role="status">Draft received. Connect a form service to deliver messages.</p>
      </div>
    </form>
  );
}
