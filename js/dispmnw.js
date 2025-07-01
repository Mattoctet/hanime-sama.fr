document.addEventListener("DOMContentLoaded", () => {
  fetchData("manwha");
});

function fetchData(type) {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  fetch(`/hanime-sama.fr/data/${type}/${code}.jsn`)
    .then(res => {
      if (!res.ok) throw new Error("Erreur de chargement");
      return res.json();
    })
    .then(data => displayData(data))
    .catch(err => {
      console.error(err);
      document.getElementById("fiche").textContent = "Erreur de chargement des données.";
    });
}

function displayData(data) {
  const fiche = document.getElementById("fiche");

  fiche.innerHTML = `
    <div class="fiche-box">
      <img src="${data.cover}" alt="cover">
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

  const menu = document.getElementById("menu-episodes");
  const lecteur = document.getElementById("lecteur");
  menu.innerHTML = "";

  let activeBtn = null;

  data.saisons.forEach((saison) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Saison " + saison.saison;
    details.appendChild(summary);

    const ul = document.createElement("ul");
    ul.className = "episode-list";

    saison.episodes.forEach((episode) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");

      const ep = episode.ep;
      const titre = episode.titre?.trim();
      const type = episode.type?.trim();

      let texteBtn = "";
      if (!titre && !type) texteBtn = `Épisode ${ep}`;
      else if (titre && !type) texteBtn = `Épisode ${ep} - ${titre}`;
      else texteBtn = `[${type}] - ${titre}`;

      btn.textContent = texteBtn;
      btn.addEventListener("click", () => {
        lecteur.innerHTML = generateLecteur(episode.liens, episode.lecteur);
        if (activeBtn) activeBtn.classList.remove("active");
        btn.classList.add("active");
        activeBtn = btn;
        scrollToLecteur();
      });

      li.appendChild(btn);
      ul.appendChild(li);
    });

    details.appendChild(ul);
    menu.appendChild(details);
  });

  // Charger le premier épisode automatiquement
  const first = data.saisons[0]?.episodes[0];
  if (first) {
    lecteur.innerHTML = generateLecteur(first.liens, first.lecteur);
    const firstBtn = menu.querySelector("button");
    if (firstBtn) {
      firstBtn.classList.add("active");
      activeBtn = firstBtn;
    }
  }
}

function generateLecteur(liens, lecteurType) {
  if (lecteurType === "viewer") {
    return liens.map((lien) => `<img src="${lien}" loading="lazy">`).join("");
  }
  return "<p>Lecteur non supporté</p>";
}

function scrollToLecteur() {
  document.getElementById("lecteur").scrollIntoView({ behavior: "smooth" });
}