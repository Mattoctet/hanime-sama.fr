// FICHIER : js/indexmnw.js
console.log("// FICHIER : js/indexmnw.js");

const basePath = "/hanime-sama.fr/data/manwha/";

fetch("/hanime-sama.fr/data/code.jsn")
  .then(res => res.json())
  .then(async data => {
    const container = document.getElementById("liste");
    const manwhas = data.filter(entry => entry.type === "manwha");

    if (manwhas.length === 0) {
      container.innerHTML = "<p>Aucun manwha disponible.</p>";
      return;
    }

    container.innerHTML = "";

    for (const entry of manwhas) {
      try {
        const res = await fetch(basePath + entry.code + ".jsn");
        if (!res.ok) throw new Error(`JSON non trouvé pour ${entry.code}`);
        const jsonData = await res.json();

        const isWarning = jsonData.warning === true;

        const lien = isWarning
          ? `/hanime-sama.fr/part/warning.htm?cible=manwha/codemnw.htm&code=${entry.code}`
          : `/hanime-sama.fr/manwha/codemnw.htm?code=${entry.code}`;

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
        console.error("Erreur chargement JSON manwha:", err);
      }
    }
  })
  .catch(err => {
    console.error("Erreur lors du chargement de la liste manwha :", err);
    document.getElementById("liste").innerHTML = "<p>Erreur de chargement des données.</p>";
  });
