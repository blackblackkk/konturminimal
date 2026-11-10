import ContactForm from '../components/ContactForm';
import { getContactItems } from '../config/contacts';

export default function Contacts() {
  const items = getContactItems();

  return (
    <section className="section section--dark contacts" id="contacts" aria-labelledby="contacts-title">
      <div className="container">
        <header className="contacts__head">
          <h2 className="display" id="contacts-title">
            Контакты
          </h2>
          <p className="contacts__intro">Будем рады обсудить ваши задачи и ответить на вопросы.</p>
        </header>

        <div className="contacts__grid">
          {items.length > 0 && (
            <dl className="contacts__list">
              {items.map((item) => (
                <div className="contacts__row" key={item.id}>
                  <dt>{item.label}</dt>
                  <dd>
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.text}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="contacts__form">
            <h3 className="contacts__form-title">Оставить сообщение</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
