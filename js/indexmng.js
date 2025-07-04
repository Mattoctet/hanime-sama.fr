// FICHIER : js/indexmng.js
console.log("// FICHIER : js/indexmng.js");

const basePath = "/hanime-sama.fr/data/manga/";

fetch("/hanime-sama.fr/data/code.jsn")
  .then(res => res.json())
  .then(async data => {
    const container = document.getElementById("liste");
    const mangas = data.filter(entry => entry.type === "manga");

    if (mangas.length === 0) {
      container.innerHTML = "<p>Aucun manga disponible.</p>";
      return;
    }

    container.innerHTML = "";

    for (const entry of mangas) {
      try {
        const res = await fetch(basePath + entry.code + ".jsn");
        if (!res.ok) throw new Error(`JSON non trouvé pour ${entry.code}`);
        const jsonData = await res.json();

        const isWarning = jsonData.warning === true;

        const lien = isWarning
          ? `/hanime-sama.fr/part/warning.htm?cible=/hanime-sama.fr/manga/code/codemng.htm&code=${entry.code}`
          : `/hanime-sama.fr/manga/code/codemng.htm?code=${entry.code}`;

        const div = document.createElement("div");
        div.className = "fiche";

        div.innerHTML = `
          <a href="${lien}">
            <img src="/hanime-sama.fr/cover/${entry.code}.jpg" alt="cover">
            <h3>${entry.titre}</h3>
          </a>
        `;

        container.appendChild(div);

      } catch (err) {
        console.error("Erreur chargement JSON manga:", err);
      }
    }
  })
  .catch(err => {
    console.error("Erreur lors du chargement de la liste manga :", err);
    document.getElementById("liste").innerHTML = "<p>Erreur de chargement des données.</p>";
  });