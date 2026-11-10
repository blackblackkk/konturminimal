const SERVICES = [
  {
    title: 'Маркетинг и стратегия',
    text: 'Анализ рынка, аудитории и конкурентов. Разработка маркетинговых стратегий и планов продвижения.',
  },
  {
    title: 'Реклама и привлечение клиентов',
    text: 'Контекстная и таргетированная реклама, рекламные кампании и инструменты привлечения клиентов.',
  },
  {
    title: 'Разработка сайтов',
    text: 'Создание корпоративных сайтов, сайтов-визиток, лендингов и других цифровых решений.',
  },
  {
    title: 'Брендинг и дизайн',
    text: 'Разработка фирменного стиля, логотипов, графических материалов и визуальной коммуникации.',
  },
  {
    title: 'SMM и контент',
    text: 'Ведение социальных сетей, создание контента, оформление и развитие социальных площадок.',
  },
  {
    title: 'Комплексное продвижение',
    text: 'SEO, работа с блогерами, партнёрские программы, аналитика и автоматизация маркетинга.',
  },
];

export default function Services() {
  return (
    <section className="section section--white services" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="services__head">
          <h2 className="display" id="services-title">
            Направления работы
          </h2>
          <p className="services__sub">Основные направления нашей деятельности.</p>
        </header>

        <ol className="services__list">
          {SERVICES.map((service, index) => (
            <li className="service" key={service.title}>
              <span className="service__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__text">{service.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
