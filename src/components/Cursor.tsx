import { useEffect, useRef } from 'react';

/**
 * Hand-coded ink-trail cursor. A fluid light stroke follows the pointer with
 * inertia, like a loaded brush. White / light-grey by default; tints faintly
 * blood-red only while hovering a clickable target (red stays rare).
 */
export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) document.documentElement.classList.add('has-ink-cursor');
    if (!fine) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: w / 2, y: h / 2 };
    // The stroke is a chain of nodes trailing the head with spring inertia.
    const N = 24;
    const nodes = Array.from({ length: N }, () => ({ x: mouse.x, y: mouse.y }));
    let visible = false;
    let hot = 0; // 0 -> white, 1 -> red tint (on interactive hover)
    let hotTarget = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      visible = true;
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest('a, button, [data-cursor="hot"], input, textarea, select, [role="button"], [role="option"]');
      hotTarget = interactive ? 1 : 0;
    };
    const onLeave = () => {
      visible = false;
    };
    const onDown = () => {
      hotTarget = Math.min(1, hotTarget + 0.4);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('mouseleave', onLeave);

    let raf = 0;
    const loop = () => {
      // Head chases the mouse; each node eases toward the one before it.
      const head = nodes[0];
      head.x += (mouse.x - head.x) * 0.35;
      head.y += (mouse.y - head.y) * 0.35;
      for (let i = 1; i < N; i++) {
        const prev = nodes[i - 1];
        const cur = nodes[i];
        cur.x += (prev.x - cur.x) * 0.42;
        cur.y += (prev.y - cur.y) * 0.42;
      }

      hot += (hotTarget - hot) * 0.12;

      ctx.clearRect(0, 0, w, h);

      if (visible) {
        // Ink color: light grey/white, drifting to a muted blood red when hot.
        const r = Math.round(237 + (139 - 237) * hot);
        const g = Math.round(237 + (46 - 237) * hot);
        const b = Math.round(237 + (46 - 237) * hot);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw tapering segments from tail to head so the head sits on top.
        for (let i = N - 1; i > 0; i--) {
          const a = nodes[i];
          const bnode = nodes[i - 1];
          const tnorm = 1 - i / N; // 0 at tail, ~1 near head
          const width = 0.6 + tnorm * tnorm * 7.5;
          const alpha = 0.06 + tnorm * 0.5;
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(bnode.x, bnode.y);
          ctx.stroke();
        }

        // Head dot — the wet tip of the brush.
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.arc(head.x, head.y, 3.4 + hot * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Faint outer ring for precision feel.
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.18 + hot * 0.2})`;
        ctx.lineWidth = 1;
        ctx.arc(mouse.x, mouse.y, 15 + hot * 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-ink-cursor');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  );
}
