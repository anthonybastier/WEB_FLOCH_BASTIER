document.getElementById('score').addEventListener('submit', async (e) => {
    e.preventDefault();
    const $pseudo = document.getElementById('pseudo').value;
    const $score = document.getElementById('score').value;

    // Ajouter le score au backend
    await fetch(`${apiUrl}/add-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, $score })
    });

    // Enregistrer le nom du joueur dans sessionStorage
    sessionStorage.setItem('pseudo', $pseudo);
});