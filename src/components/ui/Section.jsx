import useReveal from '../../hooks/useReveal.js';

export default function Section({ id, eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} className="section">
      <div className="container reveal" ref={ref}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
