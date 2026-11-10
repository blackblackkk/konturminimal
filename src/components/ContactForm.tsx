import { useId, useState, type FormEvent } from 'react';
import { contacts } from '../config/contacts';
import { url } from '../config/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'contact' | 'message';
type Errors = Partial<Record<FieldName, string>>;

/** Адрес формы Formspree. Задаётся в .env.local или в настройках Vercel. */
const ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '').trim();

const REQUIRED: Record<FieldName, string> = {
  name: 'Укажите, как к вам обращаться.',
  contact: 'Укажите телефон или мессенджер для связи.',
  message: 'Напишите сообщение.',
};

const FIELD_ORDER: FieldName[] = ['name', 'contact', 'message'];

export default function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const configured = ENDPOINT !== '';
  const telegram = contacts.telegram.trim();

  const clearError = (field: FieldName) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || status === 'submitting') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors: Errors = {};
    for (const field of FIELD_ORDER) {
      if (String(data.get(field) ?? '').trim() === '') nextErrors[field] = REQUIRED[field];
    }
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      // Успех показываем только после подтверждения от сервера.
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-result" role="status">
        <p className="form-result__title">Сообщение отправлено.</p>
        <p>Спасибо. Мы свяжемся с вами в ближайшее время.</p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setStatus('idle');
            setErrors({});
          }}
        >
          Написать ещё одно сообщение
        </button>
      </div>
    );
  }

  const field = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    required: true,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-error` : undefined,
    onInput: () => clearError(name),
  });

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p className="form__error" id={`${uid}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {!configured && (
        <div className="form__notice" role="note">
          <p>
            Форма пока не подключена, поэтому отправить сообщение через сайт нельзя.
            {telegram && (
              <>
                {' '}
                Напишите нам в{' '}
                <a href={telegram} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
                .
              </>
            )}
          </p>
          {import.meta.env.DEV && (
            <p className="form__notice-dev">
              Для разработчика: создайте форму на formspree.io и укажите её адрес в переменной{' '}
              <code>VITE_FORMSPREE_ENDPOINT</code> (файл <code>.env.local</code> или настройки
              проекта в Vercel), затем перезапустите сборку. Подробности — в README.
            </p>
          )}
        </div>
      )}

      <div className="form__field">
        <label htmlFor={`${uid}-name`}>Ваше имя</label>
        <input type="text" autoComplete="name" maxLength={120} {...field('name')} />
        {errorText('name')}
      </div>

      <div className="form__field">
        <label htmlFor={`${uid}-contact`}>Телефон или мессенджер</label>
        <input type="text" autoComplete="tel" maxLength={160} {...field('contact')} />
        {errorText('contact')}
      </div>

      <div className="form__field">
        <label htmlFor={`${uid}-message`}>Ваше сообщение</label>
        <textarea rows={4} maxLength={4000} {...field('message')} />
        {errorText('message')}
      </div>

      {/* Поле-ловушка для ботов: людям не показывается, Formspree его учитывает. */}
      <input
        type="text"
        name="_gotcha"
        className="form__trap"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status === 'error' && (
        <p className="form__status form__status--error" role="alert">
          Не удалось отправить сообщение. Попробуйте ещё раз
          {telegram ? (
            <>
              {' '}
              или напишите нам в{' '}
              <a href={telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </>
          ) : null}
          .
        </p>
      )}

      <div className="form__footer">
        <button
          type="submit"
          className="button button--light"
          disabled={!configured || status === 'submitting'}
        >
          {status === 'submitting' ? 'Отправляем…' : 'Отправить сообщение'}
        </button>
        <p className="form__legal">
          Отправляя сообщение, вы соглашаетесь с{' '}
          <a href={url('privacy')}>политикой конфиденциальности</a>.
        </p>
      </div>
    </form>
  );
}
