import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Rotates through a list of words in place, one swapping out for the next. */
export default function WordCycler({
  words,
  interval = 2600,
  className = ''
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-grid ${className}`} style={{ verticalAlign: 'baseline' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '0.7em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.7em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      {/* invisible sizer keeps layout width stable to the widest word */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
      </span>
    </span>
  );
}
