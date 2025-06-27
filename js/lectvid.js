// FICHIER : js/lectvid.js

async function loadVideoLecteur(data, saison = 1, episode = 1) {
  if (!data || !data.saisons) {
    console.error("Données invalides pour lecteur vidéo");
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

  const video = document.getElementById("lecteur-video");
  if (!video) {
    console.error("Balise vidéo introuvable");
    return;
  }

  video.src = epData.lien;
  video.load();
  video.play();
}

// Exemple d'appel :
// fetch('data.json').then(r => r.json()).then(data => loadVideoLecteur(data, 1, 1));
