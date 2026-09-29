/**
 * Light argentic film-grain overlay. An SVG turbulence tile, tiled and nudged
 * every frame-ish via CSS animation for a living, cinematic texture.
 */
export default function Grain() {
  return (
    <div aria-hidden="true" className="grain-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" className="grain-svg">
        <filter id="onyx-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#onyx-grain)" />
      </svg>
      <style>{`
        .grain-overlay {
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 60;
          opacity: 0.05;
          mix-blend-mode: overlay;
          animation: grain-shift 0.7s steps(4) infinite;
        }
        .grain-svg { width: 100%; height: 100%; }
        @keyframes grain-shift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-4%, 3%); }
          50%  { transform: translate(3%, -5%); }
          75%  { transform: translate(-2%, 4%); }
          100% { transform: translate(2%, -2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain-overlay { animation: none; }
        }
      `}</style>
    </div>
  );
}
