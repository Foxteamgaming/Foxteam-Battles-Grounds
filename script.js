// Fonction pour afficher ou masquer le code sélectionné avec effet
function toggleCode(element) {
    // Désactiver tous les autres éléments
    document.querySelectorAll('#code-list li').forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
        }
    });

    // Activer ou désactiver l'élément sélectionné
    element.classList.toggle('active');
}
