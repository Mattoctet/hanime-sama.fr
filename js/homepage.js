// FICHIER : js/homepage.js
console.log('// FICHIER : js/homepage.js');

document.addEventListener("DOMContentLoaded", () => {
  // Chargement des récents
  fetch("/hanime-sama.fr/data/recent.jsn")
    .then(res => res.json())
    .then(data => {
      populateSection("recent", data);
    })
    .catch(err => console.error("Erreur chargement recent.jsn :", err));

  // Chargement des populaires
  fetch("/hanime-sama.fr/data/popular.jsn")
    .then(res => res.json())
    .then(data => {
      populateSection("popular", data);
    })
    .catch(err => console.error("Erreur chargement popular.jsn :", err));
});

function populateSection(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "episode-card";
    card.style.cursor = "pointer";

    let ciblePath;
    switch (item.type) {
      case "anime": ciblePath = "/hanime-sama.fr/anime/code/codeani.htm"; break;
      case "manga": ciblePath = "/hanime-sama.fr/manga/code/codemng.htm"; break;
      case "manwha": ciblePath = "hanime-sama.fr/manwha/code/codemnw.htm"; break;
      case "scan": ciblePath = "/hanime-sama.fr/scan/code/codescan.htm"; break;
      default: ciblePath = null;
    }

    card.onclick = () => {
    console.log("Warning value for", item.titre, ":", item.warning, typeof item.warning);

    if (!ciblePath) {
      alert("Type inconnu pour " + item.titre);
      return;
    }

    if (item.warning === true || item.warning === "true") {
      const url = `/hanime-sama.fr/part/warning.htm?cible=${encodeURIComponent(ciblePath)}&code=${encodeURIComponent(item.code)}`;
      location.href = url;
    } else {
      const url = `/hanime-sama.fr/${ciblePath}?code=${encodeURIComponent(item.code)}`;
      location.href = url;
    }
  };

    card.innerHTML = `
      <img src="${item.cover}" alt="${item.titre}">
      <h3>${item.titre}</h3>
    `;
    container.appendChild(card);
  });
}
