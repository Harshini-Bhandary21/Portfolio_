import { useState } from 'react';
import Section from '../ui/Section.jsx';
import LocalTime from '../ui/LocalTime.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';
import TechCube from '../ui/TechCube.jsx';
import { MailIcon } from '../ui/Icons.jsx';
import { profile } from '../../data/profile.js';

// Messages are delivered through Formspree: set VITE_CONTACT_ENDPOINT to your https://formspree.io/f/<id> URL.
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
      setCopied(false); // clipboard blocked: the address stays visible on the button
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.website) return; // honeypot

    if (!ENDPOINT) {
      setStatus('error'); // endpoint not configured
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
            <button type="button" className="btn btn-primary" onClick={copyEmail}><MailIcon /> {copied ? 'Copied ✓' : profile.email}</button>
          </div>
          <LocalTime place={profile.location} />
          <SocialLinks />
          <TechCube />
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
            {status === 'sent' && 'Thanks! Your message has been sent.'}
            {status === 'error' && `Something went wrong. Please try again, or reach me at ${profile.email}.`}
          </p>
        </form>
      </div>
    </Section>
  );
}
