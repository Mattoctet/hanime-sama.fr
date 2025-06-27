// FICHIER : js/lectifm.js

function loadIframeManga(data, episode = "ep1") {
  if (!data || !data.episodes) {
    console.error("Données invalides pour lecteur iframe manga");
    return;
  }

  const container = document.getElementById("lecteur-viewer");
  if (!container) {
    console.error("Conteneur lecteur manga introuvable");
    return;
  }

  container.innerHTML = "";

  const epData = data.episodes.find(e => e.hasOwnProperty(episode));
  if (!epData) {
    console.error("Épisode non trouvé :", episode);
    return;
  }

  const liens = epData[episode];

  liens.forEach(url => {
    if (!url) return;
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.frameBorder = 0;
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.marginBottom = "10px";
    container.appendChild(iframe);
  });
}


// Exemple d'appel :
// fetch('data.json').then(r => r.json()).then(data => loadIframeManga(data, "ep1"));
