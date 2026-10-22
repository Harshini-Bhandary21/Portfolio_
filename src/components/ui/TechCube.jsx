const FACES = ['AI', 'IoT', 'Web', 'Mobile', 'Cloud', 'Edge'];

// Pure-CSS rotating cube: six faces for the areas I build in. Decorative, so hidden from assistive tech.
export default function TechCube() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube">
        {FACES.map((f, i) => <span className={`cube-face cube-face-${i}`} key={f}>{f}</span>)}
      </div>
      <span className="cube-shadow" />
    </div>
  );
}
