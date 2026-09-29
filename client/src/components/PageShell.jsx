export default function PageShell({ eyebrow, title, lead, children }) {
  return (
    <section className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-8 sm:pb-24">
        <p className="animate-rise text-xs uppercase tracking-[0.2em] text-sage sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-display text-[1.75rem] leading-tight tracking-tight text-paper sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="animate-rise-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-mist sm:mt-5 sm:text-lg">
            {lead}
          </p>
        ) : null}
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
