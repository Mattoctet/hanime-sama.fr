// FICHIER : js/lectifr.js

async function loadIframeLecteur(data, saison = 1, episode = 1) {
  if (!data || !data.saisons) {
    console.error("Données invalides pour lecteur iframe");
    return;
  }

  const saisonData = data.saisons.find(s => s.saison === saison);
  if (!saisonData) {
    console.error("Saison non trouvée :", saison);
    return;
  }

  const epData = saisonData.episodes.find(e => e.ep === episode);
  if (!epData) {
    console.error("Épisode non trouvé :", episode);
    return;
  }

  const iframe = document.getElementById("lecteur-iframe");
  if (!iframe) {
    console.error("Iframe lecteur introuvable");
    return;
  }

  iframe.src = epData.lien;
}


// Exemple d'appel :
// fetch('data.json').then(r => r.json()).then(data => loadIframeLecteur(data, 1, 1));
