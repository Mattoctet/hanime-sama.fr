// FICHIER : disp.js

(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // Détermine si on est dans un sous-dossier (ex: /code/)
  const baseData = location.pathname.includes("/code/") ? "../data/" : "/data/";
  const basePart = location.pathname.includes("/code/") ? "../part/" : "/partials/";

  if (!code) {
    // Page liste
    fetch(baseData + "code.json")
      .then(r => r.json())
      .then(data => {
        const cont = document.getElementById("content-container");
        if (!cont) return;
        cont.innerHTML = Object.entries(data).map(([k, v]) =>
          `<div>
            <h3><a href="${location.pathname.includes("/code/") ? "" : "code/"}?code=${k}">${v.titre || "Sans titre"}</a></h3>
            <p>${v.description || ""}</p>
          </div>`).join("");
      })
      .catch(() => {
        const cont = document.getElementById("content-container");
        if (cont) cont.innerHTML = "<p>Erreur de chargement.</p>";
      });

  } else {
    // Page détail
    fetch(baseData + code + ".jsn")
      .then(r => r.json())
      .then(data => {
        const fiche = document.getElementById("fiche");
        if (!fiche) return;

        fiche.innerHTML = `
          <h2>${data.titre}</h2>
          <img src="${location.pathname.includes("/code/") ? "../" : "/"}${data.cover}" alt="cover">
          <p>${data.desc}</p>
          <p class="genre">${data.genre.join(", ")}</p>
        `;

        const menu = document.getElementById("menu-episodes");
        menu.innerHTML = `<select id="select-ep">${data.saisons.flatMap((s, si) =>
          s.episodes.map((ep, ei) => `<option value="${si}-${ei}">S${s.saison} - ${ep.titre}</option>`)
        ).join("")}</select>`;

        function chargerEpisode(si, ei) {
          const ep = data.saisons[si].episodes[ei];
          const cont = document.getElementById("lecteur");
          if (!cont) return;

          switch (data.lecteur) {
            case "video":
              cont.innerHTML = `<object data="${basePart}lectvid.htm"></object>`;
              setTimeout(() => {
                const source = document.querySelector("#lecteur-video source");
                const video = document.querySelector("#lecteur-video");
                if (source && video) {
                  source.src = `${location.pathname.includes("/code/") ? "../" : "/"}${ep.lien}`;
                  video.load();
                }
              }, 100);
              break;

            case "iframe":
              cont.innerHTML = `<object data="${basePart}lectifr.htm"></object>`;
              setTimeout(() => {
                const iframe = document.querySelector("#lecteur-iframe");
                if (iframe) iframe.src = ep.lien;
              }, 100);
              break;

            case "img":
              cont.innerHTML = `<object data="${basePart}lectimg.htm"></object>`;
              fetch(`${location.pathname.includes("/code/") ? "../" : "/"}${ep.lien}/list.json`)
                .then(r => r.json())
                .then(imgs => {
                  const bloc = document.getElementById("lecteur-imgs");
                  if (bloc) bloc.innerHTML = imgs.map(img => `<img src="${location.pathname.includes("/code/") ? "../" : "/"}${ep.lien}/${img}" class="page-img">`).join("");
                });
              break;

            case "ifrset":
              cont.innerHTML = `<object data="${basePart}lectset.htm"></object>`;
              fetch(`${location.pathname.includes("/code/") ? "../" : "/"}${ep.lien}/list.json`)
                .then(r => r.json())
                .then(ifrs => {
                  const bloc = document.getElementById("lecteur-iframes");
                  if (bloc) bloc.innerHTML = ifrs.map(l => `<iframe src="${l}" frameborder="0"></iframe>`).join("");
                });
              break;
          }

          const nav = document.getElementById("navig");
          if (nav) {
            nav.innerHTML = `
              <button onclick="navigate(${si}, ${ei - 1})">◀ Précédent</button>
              <button onclick="navigate(${si}, ${ei + 1})">Suivant ▶</button>
            `;
            nav.dataset.saisons = JSON.stringify(data.saisons);
            nav.dataset.lecteur = data.lecteur;
          }
        }

        window.navigate = (si, ei) => {
          const nav = document.getElementById("navig");
          if (!nav) return;
          const saisons = JSON.parse(nav.dataset.saisons);
          const lecteur = nav.dataset.lecteur;

          if (si < 0) si = 0;
          if (ei < 0) ei = 0;
          if (si >= saisons.length) si = saisons.length - 1;
          if (ei >= saisons[si].episodes.length) ei = saisons[si].episodes.length - 1;

          chargerEpisode(si, ei);
        };

        document.getElementById("select-ep").addEventListener("change", e => {
          const [si, ei] = e.target.value.split("-").map(Number);
          chargerEpisode(si, ei);
        });

        chargerEpisode(0, 0);

      })
      .catch(() => {
        const fiche = document.getElementById("fiche");
        if (fiche) fiche.innerHTML = "<p>Erreur de chargement.</p>";
      });
  }
})();
