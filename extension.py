import os

# Dossier courant
racine = os.getcwd()

# Parcours récursif des fichiers
for dossier_racine, sous_dossiers, fichiers in os.walk(racine):
    for fichier in fichiers:
        # Exclure les fichiers AppleDouble et tout fichier qui ne finit pas par ".html"
        if fichier.startswith("._") or not fichier.lower().endswith(".jsn"):
            continue

        ancien_chemin = os.path.join(dossier_racine, fichier)
        nouveau_nom = fichier[:-5] + ".jsn"
        nouveau_chemin = os.path.join(dossier_racine, nouveau_nom)

        try:
            os.rename(ancien_chemin, nouveau_chemin)
            print(f"[OK] {ancien_chemin} → {nouveau_chemin}")
        except Exception as e:
            print(f"[ERREUR] {ancien_chemin} : {e}")
