// Timer décompte avant la date de sortie
const countdownElement = document.getElementById('countdown-timer');

// Modifier ici la date cible de sortie (année, mois-1, jour, heure, minutes, secondes)
const targetDate = new Date('2027-09-24T20:00:00');

function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
        countdownElement.textContent = "Le jeu est disponible !";
        clearInterval(timerInterval);
        return;
    }

    // Calcul des années, jours, heures, minutes, secondes
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInYear = msInDay * 365; // approximation sans années bissextiles

    const years = Math.floor(diff / msInYear);
    diff -= years * msInYear;

    const days = Math.floor(diff / msInDay);
    diff -= days * msInDay;

    const hours = Math.floor(diff / msInHour);
    diff -= hours * msInHour;

    const minutes = Math.floor(diff / msInMinute);
    diff -= minutes * msInMinute;

    const seconds = Math.floor(diff / msInSecond);

    // Format XXy YYj HHh MMm SSs avec zéros devant si < 10 sauf années et jours
    countdownElement.textContent =
        `${years}y ` +
        `${days.toString().padStart(2, '0')}j ` +
        `${hours.toString().padStart(2, '0')}h` +
        `${minutes.toString().padStart(2, '0')}m` +
        `${seconds.toString().padStart(2, '0')}s`;
}

// Mettre à jour chaque seconde
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);


// Fonction de copie de code avec toggle active
function toggleCode(element) {
    const fullText = element.textContent;

    // Extraire la partie avant le '='
    const rawCode = fullText.split('=')[0] || "";

    // Enlever les emojis et caractères spéciaux, mais garder lettres, chiffres, espaces, et tirets
    const codeText = rawCode.replace(/[^\p{L}\p{N} \-]/gu, "").trim();

    // Copier dans le presse-papiers
    navigator.clipboard.writeText(codeText).then(() => {
        // Enlever les autres codes actifs
        document.querySelectorAll('#code-list li').forEach(item => {
            item.classList.remove('active');
        });

        // Marquer celui sélectionné
        element.classList.add('active');

        // Supprimer un ancien message s'il existe
        const oldMsg = document.querySelector('.copy-message');
        if (oldMsg) oldMsg.remove();

        // Ajouter un message de confirmation
        const msg = document.createElement('div');
        msg.className = 'copy-message';
        msg.innerText = `✅ "${codeText}" copié dans le presse-papiers !`;

        element.appendChild(msg);

        // Supprimer le message après 2 secondes
        setTimeout(() => {
            msg.remove();
        }, 2000);
    });
}
