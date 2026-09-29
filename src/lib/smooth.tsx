import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollTarget = string | number | HTMLElement;

interface SmoothCtx {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean }) => void;
  start: () => void;
  stop: () => void;
}

const Ctx = createContext<SmoothCtx>({
  lenis: null,
  scrollTo: () => {},
  start: () => {},
  stop: () => {}
});

export const useSmooth = () => useContext(Ctx);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.09
    });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so scroll + ScrollTrigger stay in lockstep.
    // Lenis scrolls the window natively, so ScrollTrigger's default (window)
    // scroller reads the right position — no scrollerProxy required.
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();
    setReady(true);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value: SmoothCtx = {
    lenis: lenisRef.current,
    scrollTo: (target, opts) => {
      lenisRef.current?.scrollTo(target as any, {
        offset: opts?.offset ?? 0,
        immediate: opts?.immediate ?? false,
        duration: 1.4
      });
    },
    start: () => lenisRef.current?.start(),
    stop: () => lenisRef.current?.stop()
  };

  return <Ctx.Provider value={value}>{ready ? children : children}</Ctx.Provider>;
}
