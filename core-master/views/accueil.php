<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="assets/accueil.css">
        <link rel="icon" href="assets/sprite/death.ico">

        <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>    
    </head>


    <body>
        <header> 
            <h1>Escape Death</h1>
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
                <tbody>
                    <tr>
                        <td>{{pseudo}}</td>
                        <td>{{score}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="login">
            <form action="" @submit.prevent>

                <p>Entrez votre pseudo ({{nbrCaracRestants}} caractères max) :</p>

                <textarea v-bind:style="{ color: nbrCaracRestants >= 0 ? 'black' : 'red' }" v-model="pseudo">Pseudo</textarea>

                <button @click="testpseudo">Jouer à Escape Death</button>

            </form>
        </div>
        
        <script src="assets/accueil.js"></script>
    </body>

</html>