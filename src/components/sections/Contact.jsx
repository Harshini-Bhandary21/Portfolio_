import Section from '../ui/Section.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';
import { MailIcon } from '../ui/Icons.jsx';
import { profile } from '../../data/profile.js';

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together">
      <div className="card contact">
        <p className="lead">
          I'm looking for opportunities to contribute to a team building products with real impact.
          My inbox is open.
        </p>
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}><MailIcon /> {profile.email}</a>
        </div>
        <SocialLinks />
      </div>
    </Section>
  );
}
