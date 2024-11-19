<!DOCTYPE html>
<html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <title>Escape Death</title>
        <link rel="stylesheet" href="assets/jeu.css">
        <link rel="icon" href="assets/sprite/death.ico">
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

            <form id="identification">
                <input type="text" id="pseudo" placeholder="pseudo" required />
                <button type="submit" name="envoi"><a href="/jeu">Jouer à Escape Death</a></button>
            </form>

            <?php
                if ($pseudo != null){ 
                        echo '<form action="/login" method="post">
                                <fieldset>
                                    <p><label>Pseudo: <input type="text" placeholder="pseudo"></label></p>
                                </fieldset>
                                </form>';
                    }
            ?>
        </div>
        
        <script src="assets/accueil.js"></script>
    </body>

</html>