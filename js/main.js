// =========================================
//   TalentDrop — main.js
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Upload zone drag & drop ---
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('cvFile');

  if (zone && input) {
    input.addEventListener('change', function () {
      if (this.files.length > 0) handleFile(this.files[0]);
    });
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.style.borderColor = 'var(--accent)';
    });
    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = '';
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    });
  }

  function handleFile(file) {
    if (!zone) return;
    zone.style.borderColor = 'var(--accent3)';
    zone.style.background = 'rgba(76,175,125,0.04)';
    zone.querySelector('h4').textContent = file.name;
    zone.querySelector('p').textContent = '✓ Archivo listo para procesar';
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Navbar scroll shadow ---
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.06)'
        : 'none';
    });
  }

});
