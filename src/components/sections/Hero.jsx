import SocialLinks from '../ui/SocialLinks.jsx';
import { DownloadIcon } from '../ui/Icons.jsx';
import { profile } from '../../data/profile.js';
import HeroCanvasBlend from '../ui/HeroCanvasBlend.jsx';

export default function Hero() {
  return (
    <section id="home" className="hero-blend-section">
      {/* 1. Unified Interactive Paint Brush Canvas (Portrait + Cyber Circuits) */}
      <HeroCanvasBlend />

      {/* 2. Seamlessly Blended Hero Text Overlay */}
      <div className="container hero-blend-container">
        <div className="hero-blend-card">
          {/* Engineering Status Pill */}
          <div className="hero-status-row">
            <span className="status-ping-dot" />
            <span className="status-title">OPEN TO ROLES &amp; RESEARCH</span>
            <span className="status-sep">/</span>
            <span className="status-inst">MITAOE PUNE</span>
          </div>

          {/* Identity & Main Typography */}
          <div className="hero-identity-group">
            <span className="hero-intro-label">Hi, I'm</span>
            <h1 className="hero-name-heading">{profile.name}</h1>
            <p className="hero-role-subheading">
              Software Engineer <span className="role-accent">&amp;</span> Hardware Innovator
            </p>
          </div>

          {/* Mission & Real-World Engineering Statement */}
          <p className="hero-mission-statement">
            {profile.tagline}
          </p>

          {/* Grounded Engineering Stat Chips */}
          <div className="hero-metric-badges">
            <div className="metric-chip">
              <span className="metric-num">9.13</span>
              <span className="metric-desc">CGPA · Computer Eng.</span>
            </div>
            <div className="metric-chip highlight-chip">
              <span className="metric-num">SIH 2025</span>
              <span className="metric-desc">National Winner</span>
            </div>
            <div className="metric-chip">
              <span className="metric-num">2 Patents</span>
              <span className="metric-desc">Filed · Accessibility</span>
            </div>
            <div className="metric-chip">
              <span className="metric-num">SafeDrain</span>
              <span className="metric-desc">Worker Safety &amp; IoT</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-action-buttons">
            <a className="btn btn-primary btn-blend" href="#projects">
              <span>View Projects</span>
              <span className="btn-arrow-icon" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost btn-blend" href={profile.resume} download>
              <DownloadIcon />
              <span>Resume</span>
            </a>
            <a className="btn btn-ghost btn-blend" href="#contact">
              <span>Contact</span>
            </a>
          </div>

          {/* Card Footer: Socials + Paint Brush Hint */}
          <div className="hero-card-foot">
            <SocialLinks />
            <div className="hero-paint-hint">
              <span className="paint-tip-icon">🖌️</span>
              <span>Sweep cursor across text &amp; portrait to paint cybernetic layer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
