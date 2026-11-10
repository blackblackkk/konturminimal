import { getContactItems } from '../config/contacts';

interface FooterProps {
  home: boolean;
}

export default function Footer({ home }: FooterProps) {
  const items = getContactItems();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a
              className="footer__logo"
              href={home ? '#top' : '/'}
              aria-label="КОНТУР ГЛАВНОЕ — на главную"
            >
              <img
                src="/assets/logo-480.png"
                width={480}
                height={149}
                alt="КОНТУР ГЛАВНОЕ"
                loading="lazy"
              />
            </a>
            <p className="footer__tagline">Рекламное агентство полного цикла</p>
          </div>

          {items.length > 0 && (
            <ul className="footer__contacts" aria-label="Контакты">
              {items.map((item) => (
                <li key={item.id}>
                  <span className="footer__label">{item.label}</span>
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer__bottom">
          <p>© {year} КОНТУР ГЛАВНОЕ</p>
          <a href="/privacy">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
