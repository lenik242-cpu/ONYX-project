import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

// Diagonal blade slant, in px, applied via clip-path to every tile.
const SLANT = 128;

export default function Portfolio() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const set = () => setIsDesktop(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  return isDesktop ? <PortfolioDiagonal /> : <PortfolioStack />;
}

/* ------------------------------------------------------------------ */
/* Desktop — diagonal pinned gallery                                   */
/* ------------------------------------------------------------------ */
function PortfolioDiagonal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const ctx = gsap.context(() => {
      // Distance is recomputed on every refresh (resize / font load) so the pin
      // length always matches the real track width.
      const state = { distance: 1 };
      const measure = () => {
        state.distance = Math.max(track.scrollWidth - window.innerWidth, 1);
      };
      measure();

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${state.distance + window.innerHeight * 0.6}`,
        pin: pin,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onRefresh: measure,
        onUpdate: (self) => {
          const p = self.progress;
          // Pure horizontal slide — no vertical drift.
          gsap.set(track, { x: -state.distance * p, y: 0 });
          // Subtle per-tile parallax so tiles don't move as one rigid slab.
          imgRefs.current.forEach((img, i) => {
            if (!img) return;
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.set(img, { xPercent: (p - 0.5) * 10 * dir });
          });
        }
      });

      // Intro reveal for the heading.
      gsap.fromTo(
        section.querySelectorAll('.pf-head'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 80%' }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-ink">
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* Heading overlay */}
        <div className="pointer-events-none absolute left-10 top-28 z-30">
          <p className="pf-head font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
            04 — Portfolio
          </p>
          <h2
            className="pf-head mt-3 font-serif text-bone"
            style={{ fontSize: 'clamp(2rem,4vw,3.6rem)', lineHeight: 1 }}
          >
            La galerie
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-10 z-30 text-right">
          <p className="pf-head font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
            Défilez — 08 pièces
          </p>
        </div>

        {/* Diagonal track */}
        <div
          ref={trackRef}
          className="absolute left-0 top-0 flex h-full items-center will-change-transform"
          style={{ paddingLeft: '9vw', paddingRight: '16vw', gap: '2.4vw' }}
        >
          {PORTFOLIO.map((piece, i) => (
            <article
              key={piece.src}
              className="relative shrink-0 overflow-hidden bg-ash/20"
              style={{
                width: 'clamp(300px, 30vw, 440px)',
                height: '64vh',
                clipPath: `polygon(${SLANT}px 0, 100% 0, calc(100% - ${SLANT}px) 100%, 0 100%)`
              }}
            >
              <img
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                src={piece.src}
                alt={`${piece.title} — ${piece.zone}`}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.9)', width: '112%', left: '-6%' }}
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/10" />
              {/* Caption kept in the safe centre-bottom band away from the slanted edges */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[18%] pb-7">
                <div>
                  <p className="font-serif text-lg text-bone">{piece.title}</p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-smoke">
                    {piece.zone}
                  </p>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-steel">{piece.index}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile — clean vertical stack                                       */
/* ------------------------------------------------------------------ */
function PortfolioStack() {
  return (
    <section id="portfolio" className="relative bg-ink px-5 py-24">
      <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">04 — Portfolio</p>
      <h2 className="mb-12 font-serif text-bone" style={{ fontSize: 'clamp(2rem,9vw,3rem)' }}>
        La galerie
      </h2>
      <div className="flex flex-col gap-5">
        {PORTFOLIO.map((piece) => (
          <article key={piece.src} className="relative overflow-hidden">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ash/20">
              <img
                src={piece.src}
                alt={`${piece.title} — ${piece.zone}`}
                className="h-full w-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.9)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-serif text-lg text-bone">{piece.title}</p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-smoke">
                    {piece.zone}
                  </p>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-steel">{piece.index}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
