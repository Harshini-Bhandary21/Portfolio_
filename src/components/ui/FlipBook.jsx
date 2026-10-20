import { useState } from 'react';

// A book of flippable leaves. Each leaf is { front, back } (React nodes) and
// `cover` / `backCover` are the outer faces. Reading order is
// cover → leaf0.back | leaf1.front → leaf1.back | leaf2.front → … → back cover.
export default function FlipBook({ cover, leaves, backCover, label }) {
  const [flipped, setFlipped] = useState(0); // number of leaves turned
  const total = leaves.length;
  const spreadCount = total + 1;

  const go = (n) => setFlipped(Math.max(0, Math.min(total, n)));
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(flipped + 1);
    if (e.key === 'ArrowLeft') go(flipped - 1);
  };

  const state = flipped === 0 ? 'closed' : flipped === total ? 'end' : 'open';

  return (
    <div className="flipbook-wrap">
      <div
        className="flipbook"
        data-state={state}
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label={label}
        onKeyDown={onKey}
      >
        <div className="fb-page fb-base" aria-hidden={flipped !== total}>{backCover}</div>

        {leaves.map((leaf, i) => {
          const isFlipped = i < flipped;
          return (
            <div
              key={i}
              className={`fb-leaf${isFlipped ? ' is-flipped' : ''}`}
              style={{ zIndex: isFlipped ? i + 1 : total - i }}
              onClick={() => go(isFlipped ? i : i + 1)}
            >
              <div className="fb-face fb-front">{i === 0 ? cover : leaf.front}</div>
              <div className="fb-face fb-back">{leaf.back}</div>
            </div>
          );
        })}
      </div>

      <div className="fb-controls">
        <button type="button" onClick={() => go(flipped - 1)} disabled={flipped === 0} aria-label="Previous page">
          ←
        </button>
        <span className="fb-dots" role="tablist" aria-label="Spreads">
          {Array.from({ length: spreadCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === flipped}
              aria-label={`Spread ${i + 1}`}
              className={i === flipped ? 'is-active' : ''}
              onClick={() => go(i)}
            />
          ))}
        </span>
        <button type="button" onClick={() => go(flipped + 1)} disabled={flipped === total} aria-label="Next page">
          →
        </button>
      </div>
    </div>
  );
}
