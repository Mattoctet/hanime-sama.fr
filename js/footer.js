console.log('// FICHIER : js/footer.js');

document.addEventListener("DOMContentLoaded", () => {
  fetch("/hanime-sama.fr/footer.htm")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.text();
    })
    .then(html => {
      const footerContainer = document.createElement("div");
      footerContainer.innerHTML = html;
      document.body.appendChild(footerContainer);
    })
    .catch(err => {
      console.error("Erreur lors du chargement du footer :", err);
    });
});
