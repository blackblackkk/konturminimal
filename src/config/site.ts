/**
 * Базовый адрес сайта. Обычно это «/», но на GitHub Pages сайт проекта
 * живёт в подпапке (например, «/konturminimal/»), и все внутренние ссылки
 * и пути к файлам должны это учитывать. Значение подставляет Vite.
 */
export const BASE: string = import.meta.env.BASE_URL;

/** Путь к странице или файлу внутри сайта: url('privacy') → '/privacy' */
export function url(path: string): string {
  return BASE + path.replace(/^\/+/, '');
}
