import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OptionWheel from './reactbits/OptionWheel';
import { useSmooth } from '../lib/smooth';
import { NAV_ITEMS, NAV_TARGETS, INSTAGRAM_URL } from '../lib/content';

export default function Nav({ enabled }: { enabled: boolean }) {
  const { scrollTo, stop, start } = useSmooth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) stop();
    else start();
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (label: string) => {
    const target = NAV_TARGETS[label];
    setOpen(false);
    if (target) {
      // Let the close animation begin, then scroll.
      setTimeout(() => scrollTo(target, { offset: 0 }), 120);
    }
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[120] transition-opacity duration-700"
        style={{ opacity: enabled ? 1 : 0, pointerEvents: enabled ? 'auto' : 'none' }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <button
            onClick={() => go('Accueil')}
            className="group flex items-baseline gap-[3px] font-serif text-xl tracking-[0.14em] text-bone md:text-2xl"
            aria-label="ONYX — Accueil"
          >
            ONYX
            {/* Red use #1 — the seal dot in the wordmark. */}
            <span className="h-[5px] w-[5px] translate-y-[-2px] rounded-full bg-blood" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-steel">
              Studio · Réalisme N&amp;G
            </span>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor="hot"
            className="group flex items-center gap-3 font-sans text-xs uppercase tracking-[0.3em] text-bone"
            aria-expanded={open}
          >
            <span className="relative flex h-3 w-6 flex-col justify-between">
              <span
                className="block h-px w-full bg-bone transition-transform duration-300"
                style={{ transform: open ? 'translateY(5.5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-px w-full bg-bone transition-opacity duration-300"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block h-px w-full bg-bone transition-transform duration-300"
                style={{ transform: open ? 'translateY(-5.5px) rotate(-45deg)' : 'none' }}
              />
            </span>
            <span className="hidden sm:inline">{open ? 'Fermer' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* faint index column */}
            <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 md:left-14 md:block">
              <p className="vertical-rl font-sans text-[10px] uppercase tracking-[0.5em] text-ash">
                Menu — Navigation
              </p>
            </div>

            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="mx-auto flex h-full max-w-[1600px] items-center px-6 md:px-24">
                <div className="h-[70vh] w-full max-w-xl">
                  <OptionWheel
                    items={NAV_ITEMS}
                    defaultSelected={0}
                    side="left"
                    textColor="#6E6E70"
                    activeColor="#EDEDED"
                    fontSize={3.2}
                    spacing={1.35}
                    tilt={7}
                    curve={1}
                    blur={2}
                    fade={0.32}
                    inset={0}
                    loop={false}
                    onPick={(_i, label) => go(label)}
                  />
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-8 md:px-24">
              <p className="max-w-xs font-sans text-xs leading-relaxed text-steel">
                Choisissez une destination — molette, glisser ou clic. Entrée pour valider.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                data-cursor="hot"
                className="font-sans text-xs uppercase tracking-[0.3em] text-bone underline-offset-8 hover:underline"
              >
                Instagram ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
