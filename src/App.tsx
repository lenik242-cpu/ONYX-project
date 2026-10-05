import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollProvider, useSmooth } from './lib/smooth';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Grain from './components/Grain';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Manifesto from './sections/Manifesto';
import Studio from './sections/Studio';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function Site() {
  const { stop, start } = useSmooth();
  const [loading, setLoading] = useState(true);

  // Lock scroll while the preloader is up.
  useEffect(() => {
    if (loading) stop();
    else {
      start();
      // Recalculate all pinned/scrub triggers once the real layout is in.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [loading, stop, start]);

  return (
    <>
      <Cursor />
      <Grain />
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Nav enabled={!loading} />

      <main>
        <Hero started={!loading} />
        <Intro />
        <Manifesto />
        <Studio />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Site />
    </SmoothScrollProvider>
  );
}
