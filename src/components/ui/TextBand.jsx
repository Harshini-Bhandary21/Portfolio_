// Oversized outlined text strip that drifts sideways as the page scrolls (driven by --scroll).
export default function TextBand({ words, reverse }) {
  const run = [...words, ...words, ...words, ...words];
  return (
    <div className={`text-band ${reverse ? 'is-reverse' : ''}`} aria-hidden="true">
      <p className="text-band-track">
        {run.map((w, i) => (
          <span key={i}>{w}<i>✦</i></span>
        ))}
      </p>
    </div>
  );
}
