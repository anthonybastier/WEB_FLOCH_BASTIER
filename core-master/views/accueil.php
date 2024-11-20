<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="assets/jeu.css">
        <link rel="icon" href="assets/sprite/death.ico">
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>    
    </head>


    <body>
        <header> 
            <h1>Hall of fame</h1>
        </header>
        <div id="hall_of_fame">
            <table id="hall_of_fame">
                <tr>
                    <th>Nom</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </table>
        </div>

        <div id="login">
            <form action="">

                <p>Entrez votre pseudo ({{nbrCaracRestants}} caractères max) :</p>

                <textarea v-if='limite' v-model="pseudo" style='color: black'></textarea>
                <textarea v-else='limite' v-model="pseudo" style='color: red'></textarea>

                <button v-if='limite' type="submit" name="envoi" enabled><a href="/jeu">Jouer à Escape Death</a></button>
                <button v-else='limite' type="submit" name="envoi" disabled><a href="/jeu">Jouer à Escape Death</a></button>

            </form>
        </div>
        
        <script src="assets/accueil.js"></script>
    </body>

</html>