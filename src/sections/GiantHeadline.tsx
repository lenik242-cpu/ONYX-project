import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GiantHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const row = rowRef.current;
    if (!el || !row) return;

    const tween = gsap.fromTo(
      row,
      { xPercent: 12 },
      {
        xPercent: -42,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex items-center overflow-hidden bg-ink py-24 md:py-40"
      aria-label="Réalisme"
    >
      <div
        ref={rowRef}
        className="flex shrink-0 items-center gap-16 whitespace-nowrap will-change-transform"
      >
        <GiantWord />
        <GiantWord muted />
      </div>
    </section>
  );
}

function GiantWord({ muted = false }: { muted?: boolean }) {
  return (
    <span className="flex items-center gap-16">
      <span
        className="font-serif leading-none"
        style={{
          fontSize: 'clamp(6rem, 22vw, 24rem)',
          fontWeight: 500,
          color: muted ? 'transparent' : '#EDEDED',
          WebkitTextStroke: muted ? '1px rgba(154,154,156,0.35)' : 'none'
        }}
      >
        RÉALISME
      </span>
      <span
        className="font-serif italic leading-none text-steel"
        style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}
      >
        noir &amp; gris
      </span>
    </span>
  );
}
