(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav__menu a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
})();

// Форма подписки (пока без бэкенда — только проверка полей)
(() => {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;
  const status = form.querySelector('.newsletter__status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email;
    const consent = form.elements.consent;

    status.classList.remove('is-error');
    if (!email.value.trim() || !email.validity.valid) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('is-error');
      email.focus();
      return;
    }
    if (!consent.checked) {
      status.textContent = 'Please accept the consent to continue.';
      status.classList.add('is-error');
      return;
    }
    // TODO: отправка на сервер / сервис рассылки
    status.textContent = 'Thank you — you are subscribed.';
    form.reset();
  });
})();
