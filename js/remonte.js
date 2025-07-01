// FICHIER : js/remonte.js
console.log('// FICHIER : js/remonte.js');

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.btn-remonter');
  const header = document.querySelector('header');

  // Cacher par défaut
  btn.style.display = 'none';

  if (!btn) return;

  // Fonction qui décide d'afficher ou cacher le bouton
  function updateBtnVisibility() {
    if (window.scrollY > 55) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }

  // Si tu veux garder l’observer aussi, il faudra choisir quelle méthode tu préfères.
  // Ici on utilise uniquement le scrollY > 55px
  window.addEventListener('scroll', updateBtnVisibility);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});