import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons.jsx';
import { profile } from '../../data/profile.js';

const items = [
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
];

export default function SocialLinks() {
  return (
    <ul className="socials">
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={profile.socials[key]} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
