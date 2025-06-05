// Récupérer les éléments HTML nécessaires
const input = document.getElementById("tache");
const btnAjouter = document.getElementById("ajouter");
const message = document.getElementById("message");
const liste = document.getElementById("liste");
const btnSupprimer = document.getElementById("supprimer");

// Ajouter un style pour l'effet hover (fond gris clair)
const style = document.createElement("style");
style.textContent = `
  .hover { background-color: #f0f0f0; }
`;
document.head.appendChild(style);

// Fonction pour afficher un message coloré sous l'input
function afficherMessage(txt, couleur) {
  message.textContent = txt;
  message.style.color = couleur;
}

// Met à jour l'affichage du bouton supprimer selon la liste
function majBoutonSupprimer() {
  btnSupprimer.style.display = liste.children.length === 0 ? "none" : "inline-block";
}

// Fonction pour ajouter une tâche
function ajouterTache() {
  const texte = input.value.trim(); // Supprimer espaces inutiles

  if (texte === "") { // Si le champ est vide
    afficherMessage("Le champ ne doit pas être vide.", "red");
    return; // Stop la fonction ici
  }

  // Créer une nouvelle ligne <li> avec une checkbox et le texte
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  li.appendChild(checkbox);
  li.append(" " + texte);
  liste.appendChild(li); // Ajouter la tâche à la liste

  // Effet hover : ajouter/enlever la classe 'hover' au survol
  li.addEventListener("mouseenter", () => li.classList.add("hover"));
  li.addEventListener("mouseleave", () => li.classList.remove("hover"));

  // Permet de cocher/décocher en cliquant sur la ligne, sauf sur la checkbox
  li.addEventListener("click", e => {
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  });

  afficherMessage("Tâche ajoutée !", "green"); // Message vert
  input.value = ""; // Vider le champ
  majBoutonSupprimer(); // Afficher le bouton supprimer si caché
}

// Fonction pour supprimer toutes les tâches cochées
function supprimerTaches() {
  const checkboxes = liste.querySelectorAll("input[type='checkbox']");
  let supprime = 0;

  // Parcourir toutes les cases à cocher
  for (const c of checkboxes) {
    if (c.checked) { // Si cochée
      liste.removeChild(c.parentElement); // Supprimer la tâche (le <li>)
      supprime++;
    }
  }

  if (supprime === 0) { // Aucune tâche cochée
    alert("Aucune tâche cochée à supprimer !");
  } else {
    afficherMessage("Tâche(s) supprimée(s) !", "orange"); // Message orange
  }
  majBoutonSupprimer(); // Mettre à jour visibilité bouton supprimer
}

// Événements au clic et touche "Entrée"
btnAjouter.addEventListener("click", ajouterTache);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    ajouterTache();
  }
});
btnSupprimer.addEventListener("click", supprimerTaches);

// Cacher le bouton supprimer au démarrage s'il n'y a pas de tâches
majBoutonSupprimer();
