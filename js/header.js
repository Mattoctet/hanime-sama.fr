//<!-- FICHIER : js/header.js -->
console.log('// FICHIER : js/header.js');
async function verifierCode() {
  const champ = document.getElementById('champ-code');
  const code = champ.value.trim();
  if (!code) return;
  try {
    const res = await fetch('data/code.jsn');
    const data = await res.json();
    if (data.includes(code)) window.location.href = `code/${code}.htm`;
    else alert('Code invalide');
  } catch (e) {
    alert('Erreur chargement des codes');
  }
}
