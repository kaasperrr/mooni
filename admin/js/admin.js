document.addEventListener('DOMContentLoaded', () => {

  // ===== Drag & drop загрузки видео =====
  const dropzone = document.getElementById('videoDropzone');
  const fileInput = document.getElementById('videoFile');
  const progressRow = document.getElementById('uploadProgress');
  const progressBar = progressRow ? progressRow.querySelector('span') : null;
  const progressLabel = document.getElementById('uploadLabel');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    ['dragenter', 'dragover'].forEach(evt =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('drag'); })
    );
    ['dragleave', 'drop'].forEach(evt =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('drag'); })
    );
    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) handleFile(fileInput.files[0]);
    });
  }

  function handleFile(file) {
    if (!file.type.startsWith('video/')) {
      alert('Пожалуйста, выберите видеофайл.');
      return;
    }
    dropzone.querySelector('.dz-text').textContent = file.name;
    progressRow.style.display = 'flex';
    let pct = 0;
    const timer = setInterval(() => {
      pct += Math.random() * 18;
      if (pct >= 100) {
        pct = 100;
        clearInterval(timer);
        progressLabel.textContent = 'Готово ✓';
      } else {
        progressLabel.textContent = Math.floor(pct) + '%';
      }
      progressBar.style.width = pct + '%';
    }, 250);
    // TODO: backend — здесь нужно отправить file на реальный сервер/хранилище
    // (например, через fetch('/api/videos', { method: 'POST', body: formData }))
  }

  // ===== Конструктор теста: добавление вопросов =====
  const addQuestionBtn = document.getElementById('addQuestion');
  const questionsWrap = document.getElementById('questionsWrap');
  let qCount = questionsWrap ? questionsWrap.querySelectorAll('.question-card').length : 0;

  if (addQuestionBtn) {
    addQuestionBtn.addEventListener('click', () => {
      qCount++;
      const card = document.createElement('div');
      card.className = 'question-card';
      card.innerHTML = `
        <span class="remove-q">Удалить ✕</span>
        <div class="field">
          <label>Вопрос ${qCount}</label>
          <input type="text" placeholder="Например: Что делает цикл?">
        </div>
        <div class="option-row"><input type="radio" name="correct-${qCount}"><input type="text" placeholder="Вариант ответа A"></div>
        <div class="option-row"><input type="radio" name="correct-${qCount}"><input type="text" placeholder="Вариант ответа B"></div>
        <div class="option-row"><input type="radio" name="correct-${qCount}"><input type="text" placeholder="Вариант ответа C"></div>
      `;
      card.querySelector('.remove-q').addEventListener('click', () => card.remove());
      questionsWrap.appendChild(card);
    });

    questionsWrap.querySelectorAll('.remove-q').forEach(btn =>
      btn.addEventListener('click', (e) => e.target.closest('.question-card').remove())
    );
  }

  const testForm = document.getElementById('testForm');
  if (testForm) {
    testForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: backend — сохранить структуру теста в базу данных
      alert('Тест сохранён (демо). Подключите backend для реального сохранения.');
    });
  }

  // ===== Входящие обращения поддержки =====
  const inboxList = document.getElementById('inboxList');
  if (inboxList) {
    inboxList.querySelectorAll('.inbox-item').forEach(item => {
      item.addEventListener('click', () => {
        inboxList.querySelectorAll('.inbox-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
    const replyBtn = document.getElementById('replySend');
    const replyInput = document.getElementById('replyInput');
    const msgsWrap = document.getElementById('threadMsgs');
    if (replyBtn) {
      replyBtn.addEventListener('click', () => {
        if (!replyInput.value.trim()) return;
        const m = document.createElement('div');
        m.className = 'msg out';
        m.textContent = replyInput.value.trim();
        msgsWrap.appendChild(m);
        msgsWrap.scrollTop = msgsWrap.scrollHeight;
        replyInput.value = '';
        // TODO: backend — отправка ответа реальному пользователю
      });
    }
  }
});
