import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

const SPECIALTIES = ['Portraits', 'Animaux', 'Clair-obscur', 'Pièces sur-mesure'];

export default function Studio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    const parallax = gsap.fromTo(
      img,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );

    const rows = el.querySelectorAll('.studio-row');
    const reveal = gsap.fromTo(
      rows,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 65%' }
      }
    );

    return () => {
      parallax.scrollTrigger?.kill();
      parallax.kill();
      reveal.scrollTrigger?.kill();
      reveal.kill();
    };
  }, []);

  return (
    <section id="studio" ref={sectionRef} className="relative bg-ink px-5 py-24 md:py-40">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ash/20">
            <img
              ref={imgRef}
              src={ASSETS.artist}
              alt="L'artiste ONYX dans son atelier"
              className="absolute inset-0 h-[124%] w-full object-cover"
              style={{ filter: 'grayscale(1) contrast(1.06) brightness(0.92)', top: '-12%' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
            <div className="absolute bottom-5 left-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-bone/80">
                L'artiste — Atelier ONYX
              </p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <p className="studio-row mb-8 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
            03 — L'artiste
          </p>
          <h2
            className="studio-row font-serif text-bone"
            style={{ fontSize: 'clamp(1.9rem,3.8vw,3.4rem)', lineHeight: 1.1 }}
          >
            Une main, une exigence, une seule spécialité menée à l'extrême.
          </h2>
          <p className="studio-row mt-8 max-w-xl font-sans text-base leading-relaxed text-steel md:text-lg">
            Le réalisme ne pardonne rien. Chaque dégradé, chaque valeur de gris est posée pour durer —
            un travail lent, patient, obsédé par la lumière. Ici, on ne reproduit pas une photo : on la
            traduit dans la peau, pour qu'elle vieillisse avec elle.
          </p>

          <ul className="studio-row mt-12 grid grid-cols-2 gap-x-8 gap-y-4">
            {SPECIALTIES.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 border-t border-white/10 pt-4 font-sans text-sm text-bone"
              >
                <span className="h-1 w-1 rounded-full bg-smoke" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
