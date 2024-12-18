<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="assets/accueil.css">
        <link rel="icon" href="assets/sprite/death.ico">

        <script src="https://cdn.jsdelivr.net/npm/vue"></script>    
    </head>


    <body>
        <header> 
            <div class="titre">
                <img src="assets/sprite/death.png" class="img left">
                    <h1>Escape Death</h1>
                <img src="assets/sprite/death.png" class="img right">
            </div>
            <p>Bienvenue dans Escape Death, le jeu qui souhaite votre mort. Dans sa grande générosité, celui-ci vous offre l'opportunité de vous en sortir en proposant 3 objets initiaux. Choisirez-vous le pistolet pour vous protéger, le billet d'avion pour vous échapper ou le mouchoir pour sécher vos larmes ?</p>
            <h2>Hall of fame</h2>
        </header>
        <div id="hall_of_fame">
            <table id="hall_of_fame">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div id="login">
            <form action='/jeu' @submit.prevent="play">

                <p>Entrez votre pseudo ({{nbrCaracRestants}} caractères max) :</p>
                <input type="text" id="pseudo" v-model="pseudo" required />
                <button type="submit">Jouer à Escape Death</button>

            </form>
        </div>
        <footer id="crdits" style="text-align: center; margin-top: 20px;">
            <p>&copy; 2024 Escape Death - Développé par Anaïs Floch et Anthony Bastier - Tous droits réservés.</p>
        </footer>

        <script src="assets/accueil.js"></script>
        <script src="assets/hall_of_fame.js"></script>
    </body>

</html>