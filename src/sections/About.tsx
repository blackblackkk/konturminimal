export default function About() {
  return (
    <section className="section section--paper about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <h2 className="eyebrow" id="about-title">
          <span className="tick" aria-hidden="true" />
          О компании
        </h2>

        <div className="about__body">
          <p className="about__lead">
            КОНТУР ГЛАВНОЕ&nbsp;— рекламное агентство полного цикла.
          </p>

          <div className="about__columns">
            <p>
              Мы объединяем различные инструменты маркетинга, рекламы и коммуникаций, помогая
              компаниям решать задачи продвижения и развития бизнеса.
            </p>
            <div>
              <p>
                Работаем с проектами разного масштаба&nbsp;— от отдельных рекламных задач до
                комплексного сопровождения.
              </p>
              <p>Наш подход сочетает стратегию, креатив и практические решения.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
