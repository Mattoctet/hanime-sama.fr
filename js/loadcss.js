// FICHIER : js/loadcss.js
console.log('// FICHIER : js/loadcss.js');
(function() {
  const dossier = window.innerWidth <= 768 ? 'tel' : 'ordi';
  ['header.css', 'style.css', 'media.css', 'home.css', 'footer.css'].forEach(nom => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `hanime-sama.fr/css/${dossier}/${nom}`; // CHEMIN ABSOLU
    document.head.appendChild(link);
  });
})();
