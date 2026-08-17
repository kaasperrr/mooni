// ===== Мобильное меню =====
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMobile = document.querySelector('.close-mobile');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (closeMobile && mobileNav) {
    closeMobile.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  // ===== Викторина на странице урока =====
  document.querySelectorAll('.quiz-q').forEach(q => {
    const options = q.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (q.dataset.answered) return; // один ответ на вопрос
        q.dataset.answered = 'true';
        const isCorrect = opt.dataset.correct === 'true';
        opt.classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) {
          const correctOpt = q.querySelector('[data-correct="true"]');
          if (correctOpt) correctOpt.classList.add('correct');
        }
      });
    });
  });

  // ===== Анимация появления карточек при скролле =====
  const animated = document.querySelectorAll('.card, .phase-card, .feature');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  animated.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
});
