// FICHIER : js/loadcss.js
console.log('// FICHIER : js/loadcss.js');
(function () {
  console.log('// FICHIER : js/loadcss.js');

  const dossier = window.innerWidth <= 768 ? 'tel' : 'ordi';
  const pathname = window.location.pathname;

  const cssCommun = ['style.css', 'header.css', 'footer.css', 'media.css'];

  let cssSpecifique = [];

  if (pathname === '/' || pathname === '/index.htm') {
    cssSpecifique = ['home.css'];
  } else if (pathname.includes('/anime/') || pathname.includes('/manga/') || pathname.includes('/manwha/')) {
    // Pas besoin de CSS spécifique
  } else if (pathname.includes('/404.htm')) {
    cssSpecifique = ['../404.css']; // Attention, ici tu peux ajuster le chemin
  } else if (pathname.includes('/code/code.htm')) {
    // Exemple spécifique si besoin
  }

  [...cssCommun, ...cssSpecifique].forEach(nom => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/hanime-sama.fr/css/${dossier}/${nom}`;
    document.head.appendChild(link);
  });
})();