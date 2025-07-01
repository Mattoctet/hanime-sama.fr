// FICHIER : js/injectComponents.js
console.log('// FICHIER : js/injectComponents.js');

document.addEventListener("DOMContentLoaded", () => {
  injectComponent("header-container", "/hanime-sama.fr/header.htm", "/hanime-sama.fr/js/header.js");
  injectComponent("remonte-container", "/hanime-sama.fr/part/remonte.htm", "/hanime-sama.fr/js/remonte.js", "/hanime-sama.fr/css/remonte.css");
  injectComponent("footer-container", "/hanime-sama.fr/footer.htm");
});

function injectComponent(id, htmlPath, jsPath = null, cssPath = null) {
  const container = document.getElementById(id);
  if (!container) return;

  fetch(htmlPath)
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
    })
    .then(() => {
      if (jsPath) {
        return import(jsPath);
      }
    })
    .then(() => {
      if (cssPath) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
      }
    })
    .catch(err => {
      container.innerHTML = `<p>Erreur chargement ${id} : ${err.message}</p>`;
    });
}
