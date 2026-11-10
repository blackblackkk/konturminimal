export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__stage">
          <img
            className="hero__logo"
            src="/assets/logo.png"
            srcSet="/assets/logo-480.png 480w, /assets/logo.png 1600w"
            sizes="(max-width: 720px) 84vw, (max-width: 1320px) 50vw, 660px"
            width={1600}
            height={495}
            alt="Логотип КОНТУР ГЛАВНОЕ"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="hero__base">
          <h1 className="hero__title" id="hero-title">
            <span className="hero__name">КОНТУР ГЛАВНОЕ</span>
            <span className="hero__claim">Рекламное агентство полного цикла.</span>
          </h1>
          <p className="hero__text">
            Комплексные решения в области рекламы, маркетинга, дизайна и развития бизнеса.
          </p>
        </div>
      </div>
    </section>
  );
}
