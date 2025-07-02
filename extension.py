import os

racine = os.getcwd()

for dossier_racine, sous_dossiers, fichiers in os.walk(racine):
    for fichier in fichiers:
        # Ne traiter que les fichiers .shtm (sans majuscule)
        if fichier.lower().endswith(".html"):
            ancien_chemin = os.path.join(dossier_racine, fichier)
            nouveau_nom = fichier[:-5] + ".htm"  # Remplace .shtm par .html
            nouveau_chemin = os.path.join(dossier_racine, nouveau_nom)

            try:
                os.rename(ancien_chemin, nouveau_chemin)
                print(f"[OK] {ancien_chemin} → {nouveau_chemin}")
            except Exception as e:
                print(f"[ERREUR] {ancien_chemin} : {e}")
