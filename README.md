# Masterbooks


## Setup projet:
<br>

### Installer toutes les dépendances côté serveur et client :

#### Se placer dans le dossier racine et lancer la commande :

```
npm install
```
<br>

### Connecter la base de données MySQL :  


#### Aller dans ```server/app/config/```, ouvrir le fichier db.config.js et remplacer les exemples par les paramètres de connexion de votre base de données MySQL.  <br><br> 

### Générer les tables:

#### Exécuter le fichier ```server/app/config/bdd.sql``` dans votre base de données pour générer les tables nécessaires.
<br>

### Connecter le client au bon serveur :

#### Aller dans ```client/src/main.js``` et remplacer l'adresse du serveur par celle de votre serveur à la ligne suivante :

```
localStorage.setItem('addressServer', 'http://129.151.226.75:8080')
```
#### Par défaut, votre serveur tournera à l'adresse :
```
localStorage.setItem('addressServer', 'http://localhost:8080')
```
<br>

### Dépendances Python pour les recommandations :

#### Avoir python3 sur son ordinateur avec une version 3.6 minimum et pip. Ensuite, installer les dépendances suivantes :
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
python3 -m pip install sklearn
```
##### nltk :
```
python3 -m pip install nltk
```
#### Enfin, exécuter le fichier ```server/app/config/setupNltk.py``` avec Python 3 pour télécharger les ressources nltk nécessaires au traitement de texte. (Si vous observez des erreurs Python, il se peut qu'il faille rajouter des ressources dans ce fichier).
```
python3 server/app/config/setupNltk.py
```


## Exécuter le projet :

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
#### Pour accéder au site une fois que le script est en fonctionnement, il suffit de se connecter à l'adresse de votre serveur sur le port ```8081``` dans le navigateur de votre choix.
