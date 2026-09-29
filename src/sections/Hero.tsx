import { useEffect, useRef } from 'react';
import MaskedHeading from '../components/reactbits/MaskedHeading';
import WordCycler from '../components/WordCycler';
import { ASSETS } from '../lib/content';

export default function Hero({ started }: { started: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) videoRef.current?.play().catch(() => {});
  }, [started]);

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Dimmed background video — the same film the letters reveal, held dark. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={ASSETS.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: 'grayscale(1) brightness(0.34) contrast(1.05)' }}
      />
      {/* Layered darkening so the masked title stays legible over any frame. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 42%, rgba(10,10,11,0) 25%, rgba(10,10,11,0.55) 70%, rgba(10,10,11,0.9) 100%)'
        }}
      />

      {/* Corner meta */}
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto max-w-[1600px]">
        <div className="absolute left-5 top-24 md:left-10 md:top-28">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
            Studio ONYX
          </p>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.4em] text-ash">
            48°N — Atelier privé
          </p>
        </div>
        <div className="absolute right-5 top-24 text-right md:right-10 md:top-28">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
            Sur rendez-vous
          </p>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.4em] text-ash">
            Depuis 2011
          </p>
        </div>
        <div className="absolute bottom-24 left-5 md:bottom-16 md:left-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
            Portraits · Animaux · Clair-obscur
          </p>
        </div>
      </div>

      {/* Center: masked heading with the film showing through the letters */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5">
        <p
          className="mb-6 font-sans text-[10px] uppercase tracking-[0.55em] text-steel opacity-0"
          style={{ animation: started ? 'fadeInUp 1s ease 0.3s forwards' : 'none' }}
        >
          Réalisme noir &amp; gris
        </p>

        <div className="w-full max-w-[1180px]">
          <MaskedHeading
            text="L'ENCRE COMME MÉMOIRE"
            tag="h1"
            mediaType="video"
            src={ASSETS.heroVideo}
            grayscale
            brightness={1.45}
            saturation={1}
            fillScale={1.35}
            parallax={30}
            drift={10}
            reveal="rise"
            trigger="mount"
            duration={1.3}
            stagger={0.12}
            align="center"
            weight={500}
            tracking={-0.02}
            lineHeight={0.98}
            textScale={0.135}
          />
        </div>

        <div
          className="mt-8 flex items-center gap-3 opacity-0"
          style={{ animation: started ? 'fadeInUp 1s ease 1.1s forwards' : 'none' }}
        >
          <span className="font-sans text-sm tracking-wide text-smoke md:text-base">
            Une trace pensée comme un
          </span>
          <span className="font-serif text-lg italic text-bone md:text-xl">
            <WordCycler words={['serment', 'héritage', 'souvenir', 'récit']} />
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
            Défiler
          </span>
          <span className="scroll-line block h-10 w-px bg-gradient-to-b from-steel to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scroll-line { animation: scrollPulse 2.2s ease-in-out infinite; transform-origin: top; }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
