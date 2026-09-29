import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Hand-coded preloader. ONYX draws up on black, a hairline bar fills to 100%,
 * then the whole curtain lifts to reveal the hero. One continuous timeline with
 * a StrictMode guard and a hard safety fallback so it can never hang.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onDone();
    };

    // Hard safety net — the reveal must never trap the page.
    const safety = window.setTimeout(finish, 5200);

    const letters = lettersRef.current!.querySelectorAll('.pl-letter');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const proxy = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        window.clearTimeout(safety);
        finish();
      }
    });

    if (reduce) {
      gsap.set(letters, { yPercent: 0, opacity: 1 });
      setPct(100);
      if (barFillRef.current) barFillRef.current.style.transform = 'scaleX(1)';
      tl.to(rootRef.current, { yPercent: -100, duration: 0.6, ease: 'power2.inOut', delay: 0.3 });
      return () => {
        window.clearTimeout(safety);
        tl.kill();
      };
    }

    tl
      // Draw the wordmark up from behind the baseline.
      .fromTo(
        letters,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.09 }
      )
      // Fill the loading bar / counter to 100%.
      .to(
        proxy,
        {
          v: 100,
          duration: 1.6,
          ease: 'power1.inOut',
          onUpdate: () => {
            setPct(Math.round(proxy.v));
            if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${proxy.v / 100})`;
          }
        },
        '-=0.5'
      )
      .to({}, { duration: 0.25 })
      // Lift the curtain.
      .to(barRef.current, { opacity: 0, duration: 0.4 }, 'out')
      .to(lettersRef.current, { y: -28, opacity: 0, duration: 0.7, ease: 'power3.inOut' }, 'out+=0.05')
      .to(rootRef.current, { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, 'out+=0.15');

    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      style={{ willChange: 'transform' }}
    >
      <div className="overflow-hidden">
        <div ref={lettersRef} className="flex overflow-hidden">
          {'ONYX'.split('').map((l, i) => (
            <span
              key={i}
              className="pl-letter inline-block font-serif text-bone leading-none"
              style={{ fontSize: 'clamp(4rem, 16vw, 12rem)', fontWeight: 500, letterSpacing: '0.02em' }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div ref={barRef} className="mt-10 flex w-[min(360px,70vw)] items-center gap-4">
        <div className="relative h-px flex-1 overflow-hidden bg-white/15">
          <div
            ref={barFillRef}
            className="absolute inset-0 origin-left bg-bone"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="font-sans text-xs tracking-[0.25em] text-steel tabular-nums">
          {String(pct).padStart(3, '0')}
        </span>
      </div>

      <span className="mt-6 font-sans text-[10px] uppercase tracking-[0.5em] text-ash">
        Réalisme noir &amp; gris
      </span>
    </div>
  );
}
