import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, INSTAGRAM_URL } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = gsap.fromTo(
      el.querySelectorAll('.ct-row'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 70%' }
      }
    );

    const parallax = gsap.fromTo(
      bgRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ink">
      {/* dim detail texture */}
      <img
        ref={bgRef}
        src={ASSETS.detail}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[120%] w-full object-cover"
        style={{ filter: 'grayscale(1) brightness(0.22) contrast(1.1)', top: '-10%' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 100% at 50% 50%, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0.85) 100%)'
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col items-center px-5 py-32 text-center md:py-52">
        <p className="ct-row mb-8 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
          06 — Prise de rendez-vous
        </p>

        <h2
          className="ct-row font-serif text-bone"
          style={{ fontSize: 'clamp(2.4rem,7vw,6.5rem)', lineHeight: 1.02 }}
        >
          Réserver une<br />consultation
        </h2>

        <p className="ct-row mt-10 max-w-xl font-sans text-base leading-relaxed text-smoke md:text-lg">
          Chaque projet commence par une conversation. Parlez-nous de votre idée — nous en ferons une
          pièce dessinée pour vous seul.
        </p>

        <div className="ct-row mt-14 flex flex-col items-center gap-6 sm:flex-row">
          {/* Red use #2 — the booking CTA accent */}
          <a
            href="mailto:studio@onyx-tattoo.fr?subject=Demande%20de%20consultation%20—%20ONYX"
            data-cursor="hot"
            className="group relative inline-flex items-center gap-3 border border-blood/70 bg-blood/10 px-9 py-4 font-sans text-sm uppercase tracking-[0.28em] text-bone transition-colors duration-300 hover:bg-blood/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blood transition-colors duration-300 group-hover:bg-bone" />
            Réserver une consultation
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            data-cursor="hot"
            className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.28em] text-bone underline-offset-8 transition hover:underline"
          >
            Instagram ↗
          </a>
        </div>

        <div className="ct-row mt-20 grid w-full max-w-2xl grid-cols-1 gap-8 border-t border-white/10 pt-10 text-left sm:grid-cols-3">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-steel">Atelier</p>
            <p className="mt-2 font-sans text-sm text-bone">Sur rendez-vous uniquement</p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-steel">Écrire</p>
            <p className="mt-2 font-sans text-sm text-bone">studio@onyx-tattoo.fr</p>
          </div>
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-steel">Suivre</p>
            <p className="mt-2 font-sans text-sm text-bone">@onyx.tattoo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
