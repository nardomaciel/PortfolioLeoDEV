// Scroll reveal para timeline e cards de projeto
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tl-item, .proj-card').forEach(el => observer.observe(el));

// Destaca o link ativo na nav conforme o scroll
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) current = section.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Formulário de contato
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('fmsg');
  msg.textContent = '// Mensagem enviada! Obrigado pelo contato 🦊';
  msg.classList.add('is-visible');
  e.target.reset();
  setTimeout(() => msg.classList.remove('is-visible'), 5000);
});

// Modais
function openModal(type, name) {
  const modal = document.getElementById(type + '-modal');
  modal.querySelector('.modal-name').textContent = name;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

// Abre modal via data-modal + data-modal-name nos botões
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal, btn.dataset.modalName));
});

// Fecha modal pelo botão/link com data-modal-close dentro do modal
document.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', () => closeModal(el.closest('.modal')));
});

// Fecha modal ao clicar no overlay
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});
