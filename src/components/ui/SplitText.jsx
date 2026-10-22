// Splits text into words that rise out of a mask one after another.
// Animation is driven from CSS (see .split-word in global.css) once an ancestor is revealed.
export default function SplitText({ text, as: Tag = 'span', className }) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="split-word" aria-hidden="true" key={i}>
          <span style={{ '--i': i }}>{word}</span>
        </span>
      ))}
    </Tag>
  );
}
