# Escape Death : projet développement WEB

# Mode d'emploi du GIT WEB_FLOCH_BASTIER

* Présentation
- Bienvenue dans Escape Death, le jeu qui souhaite votre mort. Vous vous réveillez dans l'endroit le plus dangereux du monde : l'Australie ! Avec l'aide d'un objet initial, vous pourrez tenter de vous en sortir en vie… Ou d'expérimenter l'une des morts les plus connues de l'humanité !

* TRIGGER WARNING :
- Ce jeu utilise des morts célèbres et historiques qui pourraient choquer des personnes liées à ces accidents de près ou de loin, il est donc conseillé aux personnes trop sensibles de ne pas jouer.

* Comment démarrer le jeu ?
- Installer GeoServer, copier le fichier "BastierAnthony" dans le dossier workspaces puis lancer le Geoserver
- Installer pgAdmin 4, créer une base de données "escape_game" et importer les 5 fichiers .sql
- Installer MAMP et allumer le serveur Apache
- Ouvrir un onglet de page internet avec écrit 'localhost'
- Inscrire votre pseudo dans la case prévue à cet effet
- Appuyer sur le bouton 'Jouer à Escape Death'
- Choisir un des 3 objets initiaux et suivre les indications
- Zoomer et dézoomer avec la molette de la souris ou les boutons + et - prévus à cet effet à gauche de l'écran
- Se déplacer comme sur une carte interactive normale

* Que faire si je n'arrive pas à sélectionner un objet ?
- Dézoomer pour remettre l'objet à sa place initiale
- Cliquer au centre de l'icône de l'objet
- Réessayer

* Comment fonctionne le score ?
- Vous disposez de 10 minutes pour terminer le jeu, au-delà desquelles vous aurez perdu et obtiendrez 0 point.
- Si vous mourrez, votre score sera de 0.
- Si vous terminez victorieux, votre score sera égal au nombre de secondes qu'il restait à votre compteur lorsque vous avez cliqué sur l'objet final.

* Comment tricher ?
- Il existe une case à cocher en haut à gauche de l'écran pour activer une heatmap
- Sinon, toutes les solutions et morts sont décrites dans le fichier soluce.txt

* Informations importantes :
- Il peut être parfois nécessaire de cliquer 2 fois sur un objet, afin d'obtenir un indice par exemple
- Lorsque survient la fin de jeu, un message pop-up s'affiche vous indiquant votre score.
- Après avoir cliqué sur 'OK', vous serez automatiquement redirigé vers la page d'accueil après 5 secondes, où votre pseudo devrait apparaître dans le Hall Of Fame avec votre score et la date de la partie.
- Si l'import des fichiers .sql ne fonctionne pas, copier-coller dans query de pgAdmin le contenu du fichier BDD.txt

* Versions :
pgAdmin 4
php 7.4.16
PgSQL 16 ou 17
MAMP 5.0.6



© 2024 Escape Death - Développé par Anaïs Floch et Anthony Bastier - Tous droits réservés.