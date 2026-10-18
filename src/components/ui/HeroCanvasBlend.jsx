import { useRef, useEffect, useState, useCallback } from 'react';
import { profile } from '../../data/profile.js';

export default function HeroCanvasBlend() {
  const containerRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const revealLayerCanvasRef = useRef(null);

  const casualImgRef = useRef(null);
  const cyborgImgRef = useRef(null);

  const [brushMode, setBrushMode] = useState('paint'); // 'paint' | 'eraser'
  const [brushSize, setBrushSize] = useState(65);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200, isOver: false });
  const [isReady, setIsReady] = useState(false);

  const lastPointRef = useRef(null);
  const isDrawingRef = useRef(false);
  const animFrameRef = useRef(null);

  // Helper: Draw circuit traces radiating from portrait to behind text
  const drawCyberCircuits = (ctx, w, h, pRect) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    const originX = pRect.x + pRect.width * 0.45;
    const originY = pRect.y + pRect.height * 0.65;

    // Circuit paths branching to the left
    const circuits = [
      // Branch 1: High towards name
      [
        { x: originX, y: originY - 120 },
        { x: originX - 90, y: originY - 160 },
        { x: pRect.x - 140, y: originY - 160 },
        { x: pRect.x - 220, y: originY - 220 },
        { x: Math.max(40, pRect.x - 420), y: originY - 220 }
      ],
      // Branch 2: Center towards role
      [
        { x: originX - 40, y: originY },
        { x: originX - 140, y: originY },
        { x: pRect.x - 60, y: originY - 40 },
        { x: pRect.x - 280, y: originY - 40 },
        { x: Math.max(40, pRect.x - 460), y: originY - 40 }
      ],
      // Branch 3: Lower towards stats
      [
        { x: originX, y: originY + 60 },
        { x: originX - 100, y: originY + 120 },
        { x: pRect.x - 120, y: originY + 120 },
        { x: pRect.x - 180, y: originY + 80 },
        { x: Math.max(40, pRect.x - 380), y: originY + 80 }
      ],
      // Branch 4: Deep bottom
      [
        { x: originX + 40, y: originY + 140 },
        { x: originX - 80, y: originY + 200 },
        { x: pRect.x - 180, y: originY + 200 },
        { x: Math.max(40, pRect.x - 340), y: originY + 200 }
      ]
    ];

    circuits.forEach((pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Solder nodes & reticles
      pts.forEach((pt, idx) => {
        if (idx === pts.length - 1 || idx === 2) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
          ctx.stroke();
        }
      });
    });

    // Digital binary & diagnostic labels near nodes
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0, 242, 254, 0.75)';
    ctx.fillText('SYS::NEURAL_BUS_01', Math.max(50, pRect.x - 400), originY - 230);
    ctx.fillText('01001000 01000010 // SIH2025', Math.max(50, pRect.x - 440), originY - 50);
    ctx.fillText('IOT_TELEMETRY // ACTIVE', Math.max(50, pRect.x - 360), originY + 95);

    ctx.restore();
  };

  // Compute portrait positioning in canvas
  const getPortraitRect = useCallback((w, h) => {
    if (w <= 820) {
      // Mobile: centered in top-half
      const size = Math.min(w * 0.88, h * 0.44, 420);
      const x = (w - size) / 2;
      const y = Math.max(12, h * 0.05);
      return { x, y, width: size, height: size };
    }
    // Desktop: right side, large and crystal clear, slightly overlapping text column
    const size = Math.min(h * 0.94, w * 0.54, 680);
    const x = w - size - Math.max(20, w * 0.03);
    const y = (h - size) / 2;
    return { x, y, width: size, height: size };
  }, []);

  // Prepare the Reveal Layer (Cyborg + Circuit Traces)
  const buildRevealLayer = useCallback(() => {
    const canvas = revealLayerCanvasRef.current;
    const cyborg = cyborgImgRef.current;
    if (!canvas || !cyborg || !cyborg.complete) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pRect = getPortraitRect(w, h);

    // 1. Draw circuit traces extending outward
    drawCyberCircuits(ctx, w, h, pRect);

    // 2. Draw high-res cyborg portrait
    ctx.drawImage(cyborg, pRect.x, pRect.y, pRect.width, pRect.height);

    // 3. Floating HUD rings & data widgets in reveal area
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(pRect.x + pRect.width * 0.5, pRect.y + pRect.height * 0.38, pRect.width * 0.28, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle scanlines across cyborg portrait
    ctx.fillStyle = 'rgba(0, 242, 254, 0.04)';
    for (let sy = pRect.y; sy < pRect.y + pRect.height; sy += 6) {
      ctx.fillRect(pRect.x, sy, pRect.width, 1.5);
    }
    ctx.restore();
  }, [getPortraitRect]);

  // Composite main canvas (Casual Base + Masked Reveal Layer)
  const compositeCanvas = useCallback(() => {
    const main = mainCanvasRef.current;
    const mask = maskCanvasRef.current;
    const reveal = revealLayerCanvasRef.current;
    const casual = casualImgRef.current;
    if (!main || !mask || !reveal || !casual || !casual.complete) return;

    const ctx = main.getContext('2d');
    const w = main.width;
    const h = main.height;

    ctx.clearRect(0, 0, w, h);

    // --- Layer 1: Base Casual Portrait ---
    const pRect = getPortraitRect(w, h);
    ctx.save();

    // Soft organic blend on left edge of casual portrait on desktop
    if (w > 820) {
      ctx.drawImage(casual, pRect.x, pRect.y, pRect.width, pRect.height);
    } else {
      ctx.drawImage(casual, pRect.x, pRect.y, pRect.width, pRect.height);
    }
    ctx.restore();

    // --- Layer 2: Masked Cyber Layer (Cyborg + Circuits) ---
    ctx.save();
    // Temporary offscreen composite
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tCtx = tempCanvas.getContext('2d');

    // Draw reveal layer
    tCtx.drawImage(reveal, 0, 0);

    // Mask it using maskCanvas
    tCtx.globalCompositeOperation = 'destination-in';
    tCtx.drawImage(mask, 0, 0);

    // Draw final masked cyber layer over casual base
    ctx.drawImage(tempCanvas, 0, 0);

    // Outer neon glow along the mask edge
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }, [getPortraitRect]);

  // Initial artistic paint sweep across visor and text
  const applyInitialArtisticStroke = useCallback(() => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const mCtx = mask.getContext('2d');
    const w = mask.width;
    const h = mask.height;

    mCtx.clearRect(0, 0, w, h);

    const pRect = getPortraitRect(w, h);

    mCtx.save();
    mCtx.lineCap = 'round';
    mCtx.lineJoin = 'round';

    // 1. Visor slash across eyes/visor
    const vY = pRect.y + pRect.height * 0.38;
    const vX1 = pRect.x + pRect.width * 0.22;
    const vX2 = pRect.x + pRect.width * 0.82;

    const grad = mCtx.createLinearGradient(vX1 - 100, vY, vX2, vY);
    grad.addColorStop(0, 'rgba(0, 242, 254, 0.95)');
    grad.addColorStop(1, 'rgba(0, 242, 254, 0.95)');
    mCtx.strokeStyle = grad;
    mCtx.lineWidth = Math.max(60, pRect.width * 0.22);

    mCtx.beginPath();
    mCtx.moveTo(vX1, vY - 10);
    mCtx.bezierCurveTo(
      pRect.x + pRect.width * 0.45, vY - 20,
      pRect.x + pRect.width * 0.65, vY - 10,
      vX2, vY + 15
    );
    mCtx.stroke();

    // 2. Sweep across collar and circuit cheek
    mCtx.lineWidth = Math.max(50, pRect.width * 0.18);
    mCtx.beginPath();
    mCtx.moveTo(pRect.x + pRect.width * 0.58, vY + 20);
    mCtx.bezierCurveTo(
      pRect.x + pRect.width * 0.68, vY + 80,
      pRect.x + pRect.width * 0.58, pRect.y + pRect.height * 0.72,
      pRect.x + pRect.width * 0.44, pRect.y + pRect.height * 0.82
    );
    mCtx.stroke();

    // 3. Paint stroke connecting from collar to behind the hero text
    mCtx.lineWidth = Math.max(45, pRect.width * 0.14);
    mCtx.beginPath();
    mCtx.moveTo(pRect.x + pRect.width * 0.44, pRect.y + pRect.height * 0.65);
    mCtx.bezierCurveTo(
      pRect.x + pRect.width * 0.15, pRect.y + pRect.height * 0.60,
      pRect.x - 80, pRect.y + pRect.height * 0.50,
      Math.max(40, pRect.x - 300), pRect.y + pRect.height * 0.48
    );
    mCtx.stroke();

    // Subtle dry-brush bristle splatters
    for (let i = 0; i < 30; i++) {
      const sx = pRect.x + pRect.width * 0.25 + Math.random() * (pRect.width * 0.6);
      const sy = pRect.y + pRect.height * 0.3 + Math.random() * (pRect.height * 0.5);
      const sr = Math.random() * 8 + 3;
      mCtx.beginPath();
      mCtx.arc(sx, sy, sr, 0, Math.PI * 2);
      mCtx.fillStyle = 'rgba(0, 242, 254, 0.85)';
      mCtx.fill();
    }

    mCtx.restore();
    compositeCanvas();
  }, [getPortraitRect, compositeCanvas]);

  // Organic paint brush stroke with bristle tracks & splatters
  const drawPaintBrush = useCallback((x1, y1, x2, y2) => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const mCtx = mask.getContext('2d');

    const dist = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const steps = Math.max(1, Math.floor(dist / 4));

    mCtx.save();
    if (brushMode === 'eraser') {
      mCtx.globalCompositeOperation = 'destination-out';
    } else {
      mCtx.globalCompositeOperation = 'source-over';
    }

    const radius = brushSize;
    const bristleCount = 12;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const cx = x1 + (x2 - x1) * t;
      const cy = y1 + (y2 - y1) * t;

      // Core brush dab
      const grad = mCtx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.95)');
      grad.addColorStop(0.65, 'rgba(0, 242, 254, 0.75)');
      grad.addColorStop(1, 'rgba(0, 242, 254, 0)');
      mCtx.fillStyle = grad;
      mCtx.beginPath();
      mCtx.arc(cx, cy, radius, 0, Math.PI * 2);
      mCtx.fill();

      // Bristle tracks perpendicular to movement
      for (let b = 0; b < bristleCount; b++) {
        const offset = (b / bristleCount - 0.5) * radius * 1.5;
        const bx = cx + Math.cos(angle + Math.PI / 2) * offset;
        const by = cy + Math.sin(angle + Math.PI / 2) * offset;
        const bRadius = (Math.random() * 0.35 + 0.15) * radius;

        mCtx.fillStyle = 'rgba(0, 242, 254, 0.5)';
        mCtx.beginPath();
        mCtx.arc(bx, by, bRadius, 0, Math.PI * 2);
        mCtx.fill();
      }
    }

    // Occasional subtle paint splatter around stroke
    if (Math.random() < 0.4) {
      for (let s = 0; s < 3; s++) {
        const sAngle = Math.random() * Math.PI * 2;
        const sDist = radius * (0.8 + Math.random() * 0.7);
        const sx = x2 + Math.cos(sAngle) * sDist;
        const sy = y2 + Math.sin(sAngle) * sDist;
        const sr = Math.random() * 3 + 1;
        mCtx.fillStyle = 'rgba(0, 242, 254, 0.8)';
        mCtx.beginPath();
        mCtx.arc(sx, sy, sr, 0, Math.PI * 2);
        mCtx.fill();
      }
    }

    mCtx.restore();
    compositeCanvas();
  }, [brushMode, brushSize, compositeCanvas]);

  // Resize canvas to match hero section container
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const main = mainCanvasRef.current;
    if (!container || !main) return;

    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);

    if (main.width !== w || main.height !== h) {
      main.width = w;
      main.height = h;

      if (!maskCanvasRef.current) maskCanvasRef.current = document.createElement('canvas');
      maskCanvasRef.current.width = w;
      maskCanvasRef.current.height = h;

      if (!revealLayerCanvasRef.current) revealLayerCanvasRef.current = document.createElement('canvas');
      revealLayerCanvasRef.current.width = w;
      revealLayerCanvasRef.current.height = h;

      buildRevealLayer();
      applyInitialArtisticStroke();
    }
  }, [buildRevealLayer, applyInitialArtisticStroke]);

  // Load images and initialize
  useEffect(() => {
    const casual = new Image();
    casual.crossOrigin = 'anonymous';
    casual.src = profile.avatarCasual;
    casualImgRef.current = casual;

    const cyborg = new Image();
    cyborg.crossOrigin = 'anonymous';
    cyborg.src = profile.avatarCyborg;
    cyborgImgRef.current = cyborg;

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setIsReady(true);
        handleResize();
      }
    };

    casual.onload = checkLoaded;
    cyborg.onload = checkLoaded;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleResize]);

  // Pointer Event Handlers across entire hero
  const handlePointerDown = (e) => {
    isDrawingRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPointRef.current = { x, y };
    drawPaintBrush(x, y, x, y);
    setCursorPos({ x, y, isOver: true });
  };

  const handlePointerMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y, isOver: true });

    if (isDrawingRef.current || e.buttons === 1 || e.pointerType === 'mouse') {
      const prev = lastPointRef.current || { x, y };
      drawPaintBrush(prev.x, prev.y, x, y);
      lastPointRef.current = { x, y };
    }
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const handlePointerLeave = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    setCursorPos((prev) => ({ ...prev, isOver: false }));
  };

  // Toolbar Actions
  const handleReset = () => {
    applyInitialArtisticStroke();
  };

  const handleFullCyber = () => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const mCtx = mask.getContext('2d');
    mCtx.save();
    mCtx.globalCompositeOperation = 'source-over';
    mCtx.fillStyle = 'rgba(0, 242, 254, 1)';
    mCtx.fillRect(0, 0, mask.width, mask.height);
    mCtx.restore();
    compositeCanvas();
  };

  const handleFullCasual = () => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const mCtx = mask.getContext('2d');
    mCtx.clearRect(0, 0, mask.width, mask.height);
    compositeCanvas();
  };

  return (
    <div
      ref={containerRef}
      className="hero-canvas-blend-stage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background Engineering Grid */}
      <div className="canvas-tech-grid" aria-hidden="true" />

      {/* Main Composite Canvas */}
      <canvas
        ref={mainCanvasRef}
        className="hero-blend-canvas"
      />

      {/* Custom Cyber Paint Brush Follower */}
      {cursorPos.isOver && (
        <div
          className="canvas-brush-cursor"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: `${brushSize * 2}px`,
            height: `${brushSize * 2}px`,
          }}
          aria-hidden="true"
        >
          <span className="brush-ring" />
          <span className="brush-bristle-cross" />
          <span className="brush-tip-badge">
            {brushMode === 'paint' ? '🖌️ CYBER BRUSH' : '🧹 ERASER'}
          </span>
        </div>
      )}

      {/* HUD Meta Readout */}
      <div className="hero-canvas-hud" aria-hidden="true">
        <span className="hud-ping-dot" />
        <span>PAINT BRUSH ENGINE // {cursorPos.isOver ? `${Math.round(cursorPos.x)}X · ${Math.round(cursorPos.y)}Y` : 'SWEEP TO BLEND'}</span>
      </div>

      {/* Floating Brush Toolbar */}
      <div className="hero-brush-toolbar" role="toolbar" aria-label="Paint Brush Controls">
        <div className="toolbar-pill-group">
          <button
            type="button"
            className={`tool-pill ${brushMode === 'paint' ? 'is-active' : ''}`}
            onClick={() => setBrushMode('paint')}
            title="Paint cybernetic reveal layer"
          >
            🖌️ Brush
          </button>
          <button
            type="button"
            className={`tool-pill ${brushMode === 'eraser' ? 'is-active' : ''}`}
            onClick={() => setBrushMode('eraser')}
            title="Erase back to casual portrait"
          >
            🧹 Erase
          </button>
        </div>

        <div className="toolbar-pill-group">
          <button
            type="button"
            className={`tool-pill ${brushSize === 45 ? 'is-active' : ''}`}
            onClick={() => setBrushSize(45)}
            title="Fine brush"
          >
            Fine
          </button>
          <button
            type="button"
            className={`tool-pill ${brushSize === 65 ? 'is-active' : ''}`}
            onClick={() => setBrushSize(65)}
            title="Medium brush"
          >
            Medium
          </button>
          <button
            type="button"
            className={`tool-pill ${brushSize === 95 ? 'is-active' : ''}`}
            onClick={() => setBrushSize(95)}
            title="Broad brush"
          >
            Broad
          </button>
        </div>

        <div className="toolbar-pill-group">
          <button
            type="button"
            className="tool-pill action-pill"
            onClick={handleReset}
            title="Reset to artistic initial sweep"
          >
            ↺ Reset
          </button>
          <button
            type="button"
            className="tool-pill action-pill"
            onClick={handleFullCyber}
            title="Reveal 100% Cyber layer"
          >
            ⚡ Full Cyber
          </button>
          <button
            type="button"
            className="tool-pill action-pill"
            onClick={handleFullCasual}
            title="Show 100% Casual portrait"
          >
            🌱 Casual
          </button>
        </div>
      </div>
    </div>
  );
}
