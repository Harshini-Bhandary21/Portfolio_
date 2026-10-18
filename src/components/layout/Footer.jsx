import SocialLinks from '../ui/SocialLinks.jsx';
import { profile } from '../../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.</p>
        <SocialLinks />
      </div>
    </footer>
  );
}
