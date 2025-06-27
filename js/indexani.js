// FICHIER : js/indexani.js
console.log("// FICHIER : js/indexani.js");

const basePath = "/data/anime/";

fetch("/data/code.jsn")
  .then(res => res.json())
  .then(async data => {
    const container = document.getElementById("liste");
    const animes = data.filter(entry => entry.type === "anime");

    if (animes.length === 0) {
      container.innerHTML = "<p>Aucun anime disponible.</p>";
      return;
    }

    container.innerHTML = "";

    for (const entry of animes) {
      try {
        const res = await fetch(basePath + entry.code + ".jsn");
        if (!res.ok) throw new Error(`JSON non trouvé pour ${entry.code}`);
        const jsonData = await res.json();

        const isWarning = jsonData.warning === true;

        const lien = isWarning
          ? `/part/warning.htm?cible=anime/codeani.htm&code=${entry.code}`
          : `/anime/codeani.htm?code=${entry.code}`;

        const div = document.createElement("div");
        div.className = "fiche";

        div.innerHTML = `
          <a href="${lien}">
            <img src="/${entry.cover}" alt="cover" />
            <h3>${entry.titre}</h3>
          </a>
        `;

        container.appendChild(div);

      } catch (err) {
        console.error("Erreur chargement JSON anime:", err);
      }
    }
  })
  .catch(err => {
    console.error("Erreur lors du chargement de la liste anime :", err);
    document.getElementById("liste").innerHTML = "<p>Erreur de chargement des données.</p>";
  });
