from bs4 import BeautifulSoup

dossier = "dxdvostfr.github.io/s4"

liens = []

def extraire_liens(prefix, debut, fin):
    for num in range(debut, fin + 1):
        nom_fichier = f"{prefix}{num}.html"
        chemin_fichier = f"{dossier}/{nom_fichier}"
        try:
            with open(chemin_fichier, "r", encoding="utf-8") as f:
                contenu = f.read()
                soup = BeautifulSoup(contenu, "html.parser")

                selected_option = soup.find("option", selected=True)
                if selected_option and "mega.nz" in selected_option.get("value", ""):
                    lien = selected_option["value"]
                    liens.append(f'"{lien}"')
                else:
                    print(f"[Alerte] Aucun lien MEGA sélectionné dans {nom_fichier}")
        except FileNotFoundError:
            print(f"[Erreur] Fichier non trouvé : {nom_fichier}")

# Épisodes
extraire_liens("ep", 0, 12)

# OAVs (exemple 1 à 3)
#extraire_liens("oav", 1, 2)

# Spéciaux (exemple 1 à 3)
#extraire_liens("sp", 1, 6)

resultat = ", ".join(liens)
print(resultat)