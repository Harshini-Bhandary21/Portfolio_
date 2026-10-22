import SocialLinks from '../ui/SocialLinks.jsx';
import { profile } from '../../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-wordmark" aria-hidden="true">{profile.name}</p>
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
