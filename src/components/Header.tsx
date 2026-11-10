import { useEffect, useState } from 'react';
import { BASE, url } from '../config/site';

interface HeaderProps {
  /** true — главная страница: ссылки ведут к якорям без перезагрузки */
  home: boolean;
}

const NAV = [
  { id: 'about', label: 'О компании' },
  { id: 'services', label: 'Направления' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Header({ home }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const base = home ? '' : BASE;

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 861px)');
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    document.body.classList.add('menu-open');

    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a
          className="header__logo"
          href={home ? '#top' : BASE}
          aria-label="КОНТУР ГЛАВНОЕ — на главную"
          onClick={close}
        >
          <img src={url('assets/logo-480.png')} width={480} height={149} alt="" />
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__links">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`${base}#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className="button button--outline button--small" href={`${base}#contacts`}>
            Связаться
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="header__toggle-lines" aria-hidden="true" />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu${open ? ' is-open' : ''}`}
        aria-label="Мобильная навигация"
        aria-hidden={!open}
      >
        <div className="container mobile-menu__inner">
          <ul className="mobile-menu__links">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`${base}#${item.id}`} tabIndex={open ? undefined : -1} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="button button--light"
            href={`${base}#contacts`}
            tabIndex={open ? undefined : -1}
            onClick={close}
          >
            Связаться
          </a>
        </div>
      </nav>
    </header>
  );
}
