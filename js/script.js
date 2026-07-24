const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const tabBtns = document.querySelectorAll('.tab-btn');
const tabIndicator = document.querySelector('.tab-indicator');
const panels = document.querySelectorAll('.projects-panel');

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabIndicator.classList.toggle('shift', index === 1);

    panels.forEach(panel => {
      panel.hidden = panel.id !== btn.dataset.target;
    });
  });
});