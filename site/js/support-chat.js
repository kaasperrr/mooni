/**
 * MOONI · Виджет поддержки
 * Простой фронтенд-чат с "быстрыми ответами".
 * Чтобы подключить реальную поддержку (людей/бэкенд), замените
 * функцию sendMessage() на вызов вашего API/сокета — точка расширения
 * помечена ниже комментарием "// TODO: backend".
 */
(function () {
  const QUICK_REPLIES = [
    'Не открывается видео',
    'Как сдать тест?',
    'Забыл пароль',
    'Другой вопрос'
  ];

  const AUTO_ANSWERS = {
    'Не открывается видео': 'Попробуйте обновить страницу и проверить интернет 📶. Если не поможет — напишите нам, и мы поможем в течение дня!',
    'Как сдать тест?': 'Тест открывается после просмотра видео урока. Выберите правильный ответ — если ошибётесь, покажем верный вариант 😉',
    'Забыл пароль': 'Нажмите «Забыли пароль?» на странице входа — мы отправим ссылку для восстановления родителям на почту.',
    'Другой вопрос': 'Опишите, что случилось, и наш куратор ответит в течение рабочего дня ⭐'
  };

  function buildWidget() {
    const launcher = document.createElement('button');
    launcher.className = 'chat-launcher';
    launcher.setAttribute('aria-label', 'Открыть чат поддержки');
    launcher.innerHTML = '💬<span class="ping">1</span>';

    const win = document.createElement('div');
    win.className = 'chat-window';
    win.innerHTML = `
      <div class="chat-header">
        <img src="../assets/logo/logo-icon.svg" alt="">
        <div>
          <b>Поддержка Mooni</b>
          <span>Обычно отвечаем быстро ⭐</span>
        </div>
        <span class="close" role="button" aria-label="Закрыть">×</span>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="msg bot">Привет! Я помогу, если что-то не работает или есть вопрос по курсу 🌙</div>
      </div>
      <div class="chat-quick" id="chatQuick"></div>
      <div class="chat-input">
        <input type="text" placeholder="Напишите сообщение..." id="chatInput">
        <button id="chatSend" aria-label="Отправить">➤</button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(win);

    const body = win.querySelector('#chatBody');
    const quickWrap = win.querySelector('#chatQuick');
    const input = win.querySelector('#chatInput');
    const sendBtn = win.querySelector('#chatSend');

    QUICK_REPLIES.forEach(q => {
      const b = document.createElement('button');
      b.textContent = q;
      b.addEventListener('click', () => sendMessage(q));
      quickWrap.appendChild(b);
    });

    launcher.addEventListener('click', () => {
      win.classList.add('open');
      launcher.querySelector('.ping')?.remove();
    });
    win.querySelector('.close').addEventListener('click', () => win.classList.remove('open'));

    sendBtn.addEventListener('click', () => {
      if (input.value.trim()) sendMessage(input.value.trim());
      input.value = '';
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        sendMessage(input.value.trim());
        input.value = '';
      }
    });

    function addMsg(text, who) {
      const m = document.createElement('div');
      m.className = `msg ${who}`;
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function sendMessage(text) {
      addMsg(text, 'me');
      // TODO: backend — здесь можно отправить сообщение реальному оператору,
      // например: fetch('/api/support/messages', { method: 'POST', body: ... })
      setTimeout(() => {
        const answer = AUTO_ANSWERS[text] || 'Спасибо! Куратор скоро ответит вам здесь 🌙';
        addMsg(answer, 'bot');
        // Сохраняем историю локально, чтобы админка могла её прочитать (демо-режим)
        saveToLocalLog(text, answer);
      }, 500);
    }

    function saveToLocalLog(question, answer) {
      const log = JSON.parse(localStorage.getItem('mooni_support_log') || '[]');
      log.push({ question, answer, time: new Date().toISOString() });
      localStorage.setItem('mooni_support_log', JSON.stringify(log));
    }
  }

  document.addEventListener('DOMContentLoaded', buildWidget);
})();
