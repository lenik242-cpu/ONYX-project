import { INSTAGRAM_URL } from '../lib/content';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink px-5 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-6xl text-bone md:text-8xl">ONYX</span>
              {/* Red use #3 — the seal */}
              <span className="mb-2 h-2 w-2 rounded-full bg-blood md:mb-3 md:h-2.5 md:w-2.5" />
            </div>
            <p className="mt-4 font-sans text-sm text-steel">
              Studio de tatouage — réalisme noir &amp; gris.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              { label: 'Instagram', href: INSTAGRAM_URL, ext: true },
              { label: 'studio@onyx-tattoo.fr', href: 'mailto:studio@onyx-tattoo.fr' },
              { label: 'Le Studio', href: '#studio' },
              { label: 'Portfolio', href: '#portfolio' }
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                data-cursor="hot"
                className="font-sans text-sm text-bone/80 underline-offset-8 transition hover:text-bone hover:underline"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans tracking-wide">
            © {new Date().getFullYear()} ONYX — Tous droits réservés. Projet fictif.
          </p>
          <p className="font-sans tracking-[0.3em] uppercase">Réalisme · Noir &amp; gris · Sur-mesure</p>
        </div>
      </div>
    </footer>
  );
}
