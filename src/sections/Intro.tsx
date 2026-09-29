import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll('.intro-line');
    const tween = gsap.fromTo(
      lines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 72%' }
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="intro" className="relative bg-ink px-5 py-32 md:py-48">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
          01 — Le studio
        </p>
        <h2 className="font-serif text-bone" style={{ fontSize: 'clamp(2rem,5.5vw,5rem)', lineHeight: 1.08 }}>
          <span className="block overflow-hidden">
            <span className="intro-line inline-block">Le réalisme noir &amp; gris,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="intro-line inline-block text-smoke">poussé au détail près.</span>
          </span>
        </h2>
        <p className="mt-12 max-w-2xl font-sans text-base leading-relaxed text-steel md:text-lg">
          Pas de tatouage vite fait. Une pièce d'exception, dessinée à la main, gravée dans la lumière
          et l'ombre — comme une œuvre confiée à la peau.
        </p>
      </div>
    </section>
  );
}
