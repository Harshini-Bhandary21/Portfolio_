import SplitText from './SplitText.jsx';
import useReveal from '../../hooks/useReveal.js';

export default function Section({ id, eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} className="section">
      <div className="container reveal" ref={ref}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <SplitText as="h2" className="section-title" text={title} />}
        {children}
      </div>
    </section>
  );
}
