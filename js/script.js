// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar scroll effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Scroll reveal animation =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Projects tab switcher =====
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

// ===== Certificate modal =====
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalClose = document.getElementById('certModalClose');

document.querySelectorAll('.view-cert-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    certModalImg.src = btn.dataset.img;
    certModal.classList.add('active');
  });
});

certModalClose.addEventListener('click', () => {
  certModal.classList.remove('active');
});

certModal.addEventListener('click', (e) => {
  if (e.target === certModal) {
    certModal.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    certModal.classList.remove('active');
  }
});

// ===== Contact form submission (Formspree) =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.btn-send');
  const originalHTML = submitBtn.innerHTML;

  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      submitBtn.innerHTML = '<span>Message Sent ✓</span>';
      contactForm.reset();
    } else {
      submitBtn.innerHTML = '<span>Something went wrong</span>';
    }
  } catch (error) {
    submitBtn.innerHTML = '<span>Network error</span>';
  }

  setTimeout(() => {
    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
  }, 2500);
});