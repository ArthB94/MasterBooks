# Masterbooks

Ce projet est une proposition de site web permettant à chaque bibliothèque d'héberger une bibliothèque en ligne de fichiers EPUB. Chaque administrateur peut ajouter les livres de leur choix au format EPUB dans le serveur en utilisant la page ``/add-book-page``. Ces livres seront ensuite disponibles sur la page ``/catalog-page``. Les administrateurs peuvent supprimer des livres en utilisant la page ``/catalog-admin-page``.

## Setup projet:



### Installer toutes les dépendances côté serveur et client :

#### Se placer dans le dossier racine et lancer la commande :

```
npm install
```



### Connecter la base de données MySQL :

#### Aller dans ``server/app/config/``, copier le fichier db.config_example.js et remplacer les exemples par les paramètres de connexion de votre base de données MySQL puis le renomer db.config.js.  ``

### Générer les tables:

#### Exécuter le fichier ``server/app/config/bdd.sql`` dans votre base de données pour générer les tables nécessaires.



### Connecter le client au bon serveur :

#### Aller dans ``client/src/main.js`` et remplacer l'adresse du serveur par celle de votre serveur à la ligne suivante :

```
localStorage.setItem('addressServer', 'http://129.151.226.75:8080')
```

#### Par défaut, votre serveur tournera à l'adresse :

```
localStorage.setItem('addressServer', 'http://localhost:8080')
```



### Dépendances Python pour les recommandations (_peut fonctionner sans mais la page recommendation sera vide_):

#### Avoir python3 sur son ordinateur avec une version 3.6 minimum et pip. Ensuite, installer les dépendances suivantes :
 _Si python3 n'est pas reconnu, remplacer python3 par python et pip3 par pip dans les commandes suivantes. Il faudra egalement remplacer python3 par python dans le fichier ``server/app/controller/livre.controller.js`` ligne 226._

##### mysql-connector-python :

```
python3 -m pip install mysql-connector-python
```
##### numpy :

```
python3 -m pip install numpy
```

##### pandas :

```
python3 -m pip install pandas
```

##### matplotlib :

```
python3 -m pip install matplotlib
```

##### sklearn :

```
python3 -m pip install scikit-learn
```

##### nltk :

```
python3 -m pip install nltk
```

#### Enfin, exécuter le fichier ``server/app/config/setupNltk.py`` avec Python 3 pour télécharger les ressources nltk nécessaires au traitement de texte. (Si vous observez des erreurs Python, il se peut qu'il faille rajouter des ressources dans ce fichier).

```
python3 server/app/config/setupNltk.py
```

## Exécution projet :

#### Se placer dans le dossier racine avant d'exécuter la commande :

##### server & client :

```
npm start
```

##### server :

```
npm run serve
```

##### client :

```
npm run cli
```

#### Pour accéder au site une fois que le script est en fonctionnement, il suffit de se connecter à l'adresse de votre serveur sur le port ``8081`` dans le navigateur de votre choix.

#### Vous pouvez avoir une démonstration du site à l'adresse suivante : _http://129.151.226.75:8081/landing-page_
