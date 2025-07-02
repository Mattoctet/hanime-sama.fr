// FICHIER : js/dispani.js

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const saisonActuelle = parseInt(urlParams.get('s')) || 1;
let episodeActuel = parseInt(urlParams.get('e')) || 1;
let serveurActuel = 'Serveur 1';
let data;

fetch(`/hanime-sama.fr/data/anime/${code}.jsn`)
  .then(response => response.json())
  .then(json => {
    data = json;
    document.title = data.titre;

    // Affichage de la fiche
    const fiche = document.getElementById("fiche");
    fiche.innerHTML = `
      <div class="fiche-box">
        <img src="/hanime-sama.fr/cover/${code}.jpg" alt="cover">
        <div class="fiche-right">
          <div class="fiche-info">
            <h1>${data.titre}</h1>
            <p><strong>Genres :</strong> ${data.genre.join(", ")}</p>
            <p>${data.desc}</p>
          </div>
          ${data.warning ? `<div class="fiche-warning">⚠️ Cette œuvre peut contenir du contenu réservé à un public averti.</div>` : ""}
        </div>
      </div>
    `;

    // Création du menu des épisodes
    const menu = document.getElementById("menu-episodes");
    menu.innerHTML = "";

    data.saisons.forEach(saison => {
      const details = document.createElement("details");

      const summary = document.createElement("summary");
      summary.textContent = "Saison " + saison.saison;
      details.appendChild(summary);

      const ul = document.createElement("ul");
      ul.className = "episode-list";

      for (let i = 0; i < saison.episodes.ep.length; i++) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        const num = saison.episodes.ep[i];
        const titre = saison.episodes.titre[i]?.trim();
        const type = saison.episodes.type[i]?.trim();

        let texteBtn = "";
        if (!titre && !type) texteBtn = `Épisode ${num}`;
        else if (titre && !type) texteBtn = `Épisode ${num} - ${titre}`;
        else texteBtn = `${type} - ${titre}`;

        btn.textContent = texteBtn;
        btn.dataset.num = num;

        btn.addEventListener("click", () => {
          episodeActuel = num;
          afficherEpisode();
        });

        li.appendChild(btn);
        ul.appendChild(li);
      }

      details.appendChild(ul);
      menu.appendChild(details);
    });

    // Création du menu de sélection de serveur
    const selectDiv = document.getElementById("select-serveur-container");
    const select = selectDiv.querySelector("select") || document.createElement("select");
    select.id = "select-serveur";
    select.innerHTML = "";

    const serveurs = Object.keys(data.saisons[0].episodes.lien);
    serveurs.forEach(nomServeur => {
      const option = document.createElement("option");
      option.value = nomServeur;
      option.textContent = nomServeur;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      serveurActuel = select.value;
      afficherEpisode();
    });

    // Si le select n'était pas encore dans le div, on l’ajoute
    if (!selectDiv.querySelector("select")) {
      selectDiv.appendChild(select);
    }

    // Afficher le bloc de sélection de serveur
    if (serveurs.length > 0) {
      selectDiv.style.display = "block";
    }

    afficherEpisode();
  });

function afficherEpisode() {
  const lecteur = document.getElementById("lecteur");
  lecteur.innerHTML = "";

  const saisonData = data.saisons.find(s => s.saison === saisonActuelle);
  if (!saisonData) return;

  const index = saisonData.episodes.ep.indexOf(episodeActuel);
  if (index === -1) return;

  const lien = saisonData.episodes.lien?.[serveurActuel]?.lien?.[index] || "";
  const type = saisonData.episodes.lien?.[serveurActuel]?.lecteur?.[index] || "";

  if (!lien) {
    lecteur.innerHTML = "<p style='color:red;'>Aucun lien disponible pour cet épisode sur ce serveur.</p>";
    return;
  }

  if (type === "video") {
    const video = document.createElement("video");
    video.src = lien;
    video.controls = true;
    video.className = "video-lecteur";
    lecteur.appendChild(video);
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = lien;
    iframe.className = "iframe-lecteur";
    iframe.allowFullscreen = true;
    lecteur.appendChild(iframe);
  }

  // Navigation
  const nav = document.getElementById("navig");
  nav.innerHTML = "";

  const boutonPrec = document.createElement("button");
  boutonPrec.textContent = "Précédent";
  boutonPrec.disabled = episodeActuel === Math.min(...saisonData.episodes.ep);
  boutonPrec.addEventListener("click", () => {
    episodeActuel--;
    afficherEpisode();
  });

  const boutonSuiv = document.createElement("button");
  boutonSuiv.textContent = "Suivant";
  boutonSuiv.disabled = episodeActuel === Math.max(...saisonData.episodes.ep);
  boutonSuiv.addEventListener("click", () => {
    episodeActuel++;
    afficherEpisode();
  });

  nav.appendChild(boutonPrec);
  nav.appendChild(boutonSuiv);

  // Marquer l'épisode actif
  document.querySelectorAll("#menu-episodes li").forEach(li => {
    li.classList.remove("selected-episode");
    const btn = li.querySelector("button");
    if (btn && parseInt(btn.dataset.num) === episodeActuel) {
      li.classList.add("selected-episode");
    }
  });
}