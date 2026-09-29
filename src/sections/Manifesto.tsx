import ScrollReveal from '../components/reactbits/ScrollReveal';

export default function Manifesto() {
  return (
    <section id="manifeste" className="relative bg-ink px-5 py-28 md:py-44">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-14 font-sans text-[10px] uppercase tracking-[0.5em] text-steel">
          02 — Manifeste
        </p>
        <ScrollReveal
          baseOpacity={0.08}
          baseRotation={2}
          blurStrength={7}
          enableBlur
          textClassName="font-serif text-bone"
          containerClassName=""
        >
          Chaque pièce est unique — dessinée pour une peau, une histoire, une seule fois.
        </ScrollReveal>
      </div>
    </section>
  );
}
