import useScrollEffects from './hooks/useScrollEffects.js';
import useTilt from './hooks/useTilt.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import Loader from './components/ui/Loader.jsx';
import BackToTop from './components/ui/BackToTop.jsx';
import TextBand from './components/ui/TextBand.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Skills from './components/sections/Skills.jsx';
import Achievements from './components/sections/Achievements.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  useScrollEffects();
  useTilt();
  useSmoothScroll();
  return (
    <>
      <Loader />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true"><span /><span /><span /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <TextBand words={['AI', 'IoT', 'Full-stack', 'Accessibility', 'Hardware']} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <TextBand words={['Let’s build', 'something', 'together']} reverse />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
