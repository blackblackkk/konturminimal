export default function Approach() {
  return (
    <section className="section section--paper approach" aria-labelledby="approach-title">
      <div className="container approach__grid">
        <h2 className="display approach__title" id="approach-title">
          Комплексный подход к&nbsp;задачам бизнеса.
        </h2>

        {/* Наклонная линия повторяет угол контура в логотипе. */}
        <span className="approach__rule" aria-hidden="true" />

        <div className="approach__text">
          <p>
            Мы рассматриваем продвижение как единую систему, в которой стратегия, реклама, дизайн и
            коммуникации дополняют друг друга.
          </p>
          <p>
            В зависимости от задач проекта подбираем необходимые инструменты и формируем оптимальное
            решение.
          </p>
        </div>
      </div>
    </section>
  );
}
