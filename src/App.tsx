import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Approach from './sections/Approach';
import Contacts from './sections/Contacts';
import Privacy from './pages/Privacy';
import { url } from './config/site';

/**
 * На сайте две страницы, поэтому отдельная библиотека маршрутизации не нужна:
 * страница выбирается по адресу, а переходы между ними — обычные ссылки.
 */
function isPrivacyPage(): boolean {
  return window.location.pathname.replace(/\/+$/, '') === url('privacy');
}

export default function App() {
  const privacy = isPrivacyPage();

  // При переходе с другой страницы по ссылке вида «/#contacts» браузер ищет якорь
  // раньше, чем отрисованы секции, поэтому докручиваем к нему после появления разметки.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (privacy || !id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
  }, [privacy]);

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Header home={!privacy} />
      <main id="main">
        {privacy ? (
          <Privacy />
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <Approach />
            <Contacts />
          </>
        )}
      </main>
      <Footer home={!privacy} />
    </>
  );
}
