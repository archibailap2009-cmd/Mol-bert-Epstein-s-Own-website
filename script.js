/* Mol’bert Epstein — интерактив.
   Сейчас: мобильное меню, форма подписки, заглушки для фото без файла.
   Дальше сюда добавляем остальное (кнопки, лайтбокс, анимации и т.д.). */

(function () {
  'use strict';

  /* ---------- мобильное меню ---------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  function closeMenu() {
    if (!toggle) return;
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- форма подписки ---------- */
  var form = document.getElementById('news-form');
  var msg = document.getElementById('form-msg');

  function say(text, type) {
    msg.textContent = text;
    msg.className = 'form-msg small ' + (type ? 'is-' + type : '');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.elements.email.value.trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!ok) {
        say('Please enter a valid email.', 'error');
        form.elements.email.focus();
        return;
      }
      if (!form.elements.consent.checked) {
        say('Please tick the consent box.', 'error');
        return;
      }
      // TODO: здесь потом подключим реальную отправку (Formspree, Netlify Forms и т.п.)
      say('Thank you — you are subscribed.', 'ok');
      form.reset();
    });
  }

  /* ---------- фото: если файла нет, показываем заглушку ---------- */
  document.querySelectorAll('.photo img').forEach(function (img) {
    function markEmpty() { img.closest('.photo').classList.add('is-empty'); }
    if (img.complete && img.naturalWidth === 0) markEmpty();
    img.addEventListener('error', markEmpty);
  });
})();
