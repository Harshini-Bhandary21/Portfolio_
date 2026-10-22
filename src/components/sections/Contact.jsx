import { useState } from 'react';
import Section from '../ui/Section.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';
import { MailIcon } from '../ui/Icons.jsx';
import { profile } from '../../data/profile.js';

// Set VITE_CONTACT_ENDPOINT (e.g. a Formspree / Web3Forms URL) to deliver messages directly.
// Without it, submitting opens the visitor's mail app with the message pre-filled.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`; // clipboard blocked: fall back to the mail app
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.website) return; // honeypot

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together">
      <div className="card contact">
        <div className="contact-info">
          <p className="lead">
            I'm looking for opportunities to contribute to a team building products with real impact.
            My inbox is open.
          </p>
          <div className="contact-links">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}><MailIcon /> {profile.email}</a>
            <button type="button" className="btn copy-btn" onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy email'}</button>
          </div>
          <SocialLinks />
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input name="name" type="text" required autoComplete="name" maxLength={80} />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required autoComplete="email" maxLength={120} />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required maxLength={2000} />
          </label>
          <input className="cf-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <p className="cf-status" role="status" aria-live="polite" data-state={status}>
            {status === 'sent' && (ENDPOINT ? 'Thanks! Your message has been sent.' : 'Opening your email app to send the message…')}
            {status === 'error' && `Something went wrong. Please email ${profile.email} directly.`}
          </p>
        </form>
      </div>
    </Section>
  );
}
