import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rows = el.querySelectorAll('.proc-row');
    const reveal = gsap.fromTo(
      rows,
      { y: 44, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: 'top 70%' }
      }
    );

    const line = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 80%', scrub: true }
      }
    );

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      line.scrollTrigger?.kill();
      line.kill();
    };
  }, []);

  return (
    <section id="process" className="relative bg-ink px-5 py-24 md:py-40">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
              05 — Le process
            </p>
            <h2 className="font-serif text-bone" style={{ fontSize: 'clamp(2rem,5vw,4.2rem)', lineHeight: 1.04 }}>
              L'expérience,<br />de la première ligne à la dernière.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-steel">
            Un tatouage réaliste se réfléchit. Voici comment se déroule chaque projet, du premier
            échange jusqu'à la cicatrisation.
          </p>
        </div>

        <div className="relative pl-6 md:pl-0">
          {/* progress rail */}
          <div className="absolute left-0 top-2 h-full w-px bg-white/10 md:left-[calc(16.66%-1px)]">
            <div ref={lineRef} className="h-full w-full origin-top bg-smoke/60" />
          </div>

          <ol>
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.n}
                className="proc-row grid grid-cols-1 gap-3 border-t border-white/10 py-10 md:grid-cols-6 md:gap-8 md:py-14"
              >
                <div className="md:col-span-1">
                  <span className="font-serif text-3xl text-smoke md:text-4xl">{step.n}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-serif text-2xl text-bone md:text-3xl">{step.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="font-sans text-sm leading-relaxed text-steel">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
