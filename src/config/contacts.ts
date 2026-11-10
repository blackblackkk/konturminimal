/**
 * Единый источник контактных данных сайта.
 *
 * Чтобы добавить или изменить контакт, впишите значение в кавычки ниже.
 * Пустая строка означает «контакт не указан»: такой пункт не выводится
 * ни в разделе «Контакты», ни в подвале — пустых и битых ссылок не будет.
 */
export const contacts = {
  /** Телефон в любом читаемом виде, например: '+7 900 000-00-00' */
  phone: '',

  /** Полная ссылка на профиль или чат в MAX, например: 'https://max.ru/...' */
  max: '',

  /** Полная ссылка на сообщество ВКонтакте, например: 'https://vk.com/...' */
  vk: '',

  /** Полная ссылка на Telegram */
  telegram: 'https://t.me/konturglavnoe',

  /** Электронная почта, например: 'hello@example.ru' */
  email: '',
} as const;

export interface ContactItem {
  id: 'phone' | 'max' | 'vk' | 'telegram' | 'email';
  label: string;
  /** Текст, который видит посетитель */
  text: string;
  href: string;
  /** Внешние ссылки открываются в новой вкладке */
  external: boolean;
}

/** 'https://t.me/name/' → 't.me/name' */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '');
}

/** Возвращает только заполненные контакты, в порядке показа на сайте. */
export function getContactItems(): ContactItem[] {
  const items: ContactItem[] = [];
  const phone = contacts.phone.trim();
  const max = contacts.max.trim();
  const vk = contacts.vk.trim();
  const telegram = contacts.telegram.trim();
  const email = contacts.email.trim();

  if (phone) {
    items.push({
      id: 'phone',
      label: 'Телефон',
      text: phone,
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      external: false,
    });
  }
  if (max) {
    items.push({ id: 'max', label: 'MAX', text: prettyUrl(max), href: max, external: true });
  }
  if (vk) {
    items.push({ id: 'vk', label: 'ВКонтакте', text: prettyUrl(vk), href: vk, external: true });
  }
  if (telegram) {
    items.push({
      id: 'telegram',
      label: 'Telegram',
      text: prettyUrl(telegram),
      href: telegram,
      external: true,
    });
  }
  if (email) {
    items.push({
      id: 'email',
      label: 'Электронная почта',
      text: email,
      href: `mailto:${email}`,
      external: false,
    });
  }

  return items;
}
