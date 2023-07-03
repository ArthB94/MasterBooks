# -*- coding: utf-8 -*-
# COPIE DE LA VERSION QUE J'AI FINI DIMANCHE SOIR QUI FONCTIONNE BIEN

import pandas as pd 
import random
# nltk permet de travailler sur des data qui sont des textes (des langues)
import nltk
from nltk.corpus import stopwords # utilisé dans le pre-processing
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import string
import sklearn 
from sklearn.cluster import KMeans
from sklearn import metrics 
from sklearn.feature_extraction.text import TfidfVectorizer # permet de vectoriser le texte
import matplotlib.pyplot as plt

# import pour db
import mysql.connector
import json




# Téléchargement des ressources nécessaires pour NLTK

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')



# ------------------------------ Pre-processing sur le dataframe ------------------------------

# Lire le contenu du fichier db.config.js
# with open('server/app/config/main_copy.py', 'r', encoding='utf-8') as file:
js_code = '''
{
  "HOST": "129.151.226.75",
  "USER": "mastercamp",
  "PASSWORD": "mastercamp",
  "DB": "masterbooks"
}
'''

# Extraire les informations de connexion du code JavaScript
config = json.loads(js_code)
host = config['HOST']
user = config['USER']
password = config['PASSWORD']
database = config['DB']

connection = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

query = "SELECT l.reference, l.titre, l.auteur, l.pages, l.resume, l.date_parution, l.langue, CASE WHEN r.email_user IS NULL THEN FALSE ELSE TRUE END AS lecture, GROUP_CONCAT(a.genre_id SEPARATOR ', ') AS genres FROM livre l LEFT JOIN lire r ON l.reference = r.reference AND r.email_user = 'arthur.billebaut@efrei.net' LEFT JOIN appartenir a ON l.reference = a.reference GROUP BY l.reference;"

dataframe = pd.read_sql(query, connection)

connection.close()

# ------------------------fin connection db

# dataframe = pd.read_csv('books_1.best_Books_Ever.csv');
print("\n----Contenue dataframe initial----\n")
print(dataframe)
print("\n----colonnes dataframe initial----\n")
print(dataframe.columns)

""" 
Les colonnes les plus importantes sont title, author, description (hyper important), language, genres, publishDate et pages
On va ajouter deux colonnes qui sont lire et sauvegarder(=wishlist)
Dans ces deux colonnes je rentrerais au hasard des binaires, 1 = oui, 0 = non
pour savoir si le livre a été lu et/ou ajouté à la wishlist
"""

# création de la colonne lire et sauvegarder (contenant des valeurs au hasard entre True ou False) le temps d'avoir la vraie base de données remplie
#dataframe['lire']= [random.choice([True,False]) for _ in range(len(dataframe))]
#dataframe['sauvegarder']= [random.choice([True,False]) for _ in range(len(dataframe))]

print("\n----colonnes dataframe après ajout de lire et sauvegarder----\n")
print(dataframe.columns)


"""
Nous réalisons un clustering basé sur le contenue donc clustering qui utilise des données textuelles.
Pour cela, on doit supprimer les colonnes qui contiennent des valeurs numériques combien même elles puissent être
intéressantes (pages et publishDate).
On doit aussi supprimer les colonnes qui ne nous intéressent pas
"""
"""colonnes_a_supprimer = ['series', 'rating','isbn', 'characters', 'bookFormat', 'edition', 'publisher', 
                        'firstPublishDate', 'awards','numRatings', 'ratingsByStars', 'likedPercent', 'setting', 
                        'coverImg','bbeScore', 'bbeVotes', 'price','pages','publishDate']
"""

# axis = 1 <== axe des colonnes
#dataframe = dataframe.drop(colonnes_a_supprimer, axis=1)
print("\n----colonnes dataframe après suppression de certaines colonnes----\n")
print(dataframe.columns)
print("\n----Contenue dataframe après modification sur colonnes----\n")
print(dataframe)

# supprimer les lignes du dataframe qui contiennent au moins une valeur manquante donc un NaN
dataframe = dataframe.dropna(how="any")
 
# afficher les différentes langues de livres dans le csv
langues = dataframe['langue'].unique()
print("\nToutes les langues qu'il y a \n")
print(langues, "\nnb de langues : ", len(langues))

"""
Il y a 78 langues (beaucoup trop). Cela peut causer des problèmes dans le prétraitement du texte
car dans cette partie on doit supprimer les mots vides (stop words) et utiliser des méthodes de tokenisation/lemmatisation/normalisation
propre à CHAQUE langue. Plus encore, la représentation vectorielle comme la technique TF-IDF que nous utiliserons
subira cela. Il en est de même pour les mesures de similarité dans le clustering, ces mesures seront influencées par les différences de langues
Pour atténuer cela, on se contente de 4 langues présentes sur le front end = français, anglais, allemand et arabe

AVEC LA VRAIE BDD PENSER A FAIRE UNE FONCTION QUI NE PREND DANS LE DATAFRAME QUI FAIT CE QUI SUIT : 
si l'utilisateur a lu et/ou sauvegarder un livre dans une langue donnée, alors on garde tous les livres écrit dans cette langue.
Ex : si l'utilisateur a lu un livre en espagnol, et a sauvegardé un livre en francais alors on garde tous les livres en espagnol et
tous les livres en français dans le dataframe car l'utilisateur sait lire cela
"""
langues_a_supprimer = ['others'] 
dataframe = dataframe.drop(dataframe[dataframe['langue'].isin(langues_a_supprimer)].index)
df = dataframe

"""def reduireLignes(df, langue, df2):
    df = df2[df2['language'] == langue]
    print(len(df))
    df = df[:250]
    print(len(df))
    return df

df_fr = 0
df_fr = reduireLignes(df_fr, 'French', dataframe)
df_eng = 0
df_eng = reduireLignes(df_eng, 'English', dataframe)
df_spa = 0
df_spa = reduireLignes(df_spa, 'Spanish', dataframe)
df_ger = 0
df_ger = reduireLignes(df_ger, 'German', dataframe)

df = pd.concat([df_fr,df_eng,df_spa, df_ger], axis=0)
df_end = df
"""
langues_save = df['langue'].unique()
print("\nToutes les langues qu'on veut garder : \n")
print(langues_save, "\nnb de langues_save : ", len(langues_save))
print("\n nombre de lignes : \n", df.shape[0])

"""
fonction qui prend en paramêtre la langue et qui enlève tous les stop words ( = mots vide = mots pas important ) liés à cette langue
Ex : "GeeksforGeeks - A Computer Science Portal for Geeks" devient "GeeksforGeeks, Computer Science, Portal, Geeks"

"""

# Définition des caractères indésirables
carac_indesirables = string.punctuation + string.digits # retourne cela : !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0123456789


# cette fonction permet de mettre un espace aprè un point car il n'y en a pas toujours et parfois ça pose problème
def espaceApresPoint(text):
    updated_text = ""
    for i in range(len(text)):
        if text[i] == "." and i < len(text) - 1 and text[i+1] != " ":
            updated_text += ". "
        else:
            updated_text += text[i]
    return updated_text


# Initialisation du lemmatiseur
lemmatizer = WordNetLemmatizer() # retourne cela : <WordNetLemmatizer>

def preProcessing_description(ligne):

    text = ligne['resume']
    language = ligne['langue']

    text = espaceApresPoint(text)

    #suppression des caractères indésirables
    #text = ''.join(char for char in text if char not in carac_indesirables)
    text = ''.join(char if char not in carac_indesirables else ' ' for char in text)

    # on met tout en minuscule
    text = text.lower()

    # tokenisation du texte, ex: on passe de "Je vais au supermarché" à '['Je', 'vais', 'au', 'supermarché']'
    tokens = word_tokenize(text)

    # définition des mots vides 
    if language == 'French' : 
        stop_words = set(stopwords.words('french'))
    elif language == 'English':
        stop_words = set(stopwords.words('english'))
    elif language =='German' :
        stop_words = set(stopwords.words('german'))
    else:
        stop_words = set(stopwords.words('spanish'))
    """' if 'French' in language"""

    # suppression des mots vides liés à la langue
    tokens = [token for token in tokens if token not in stop_words]

    # Lemmatisation : processus linguistique qui remplace les mots par leur lemme. Ex : "mangeait", "mangé" et "mangeant" ont pour lemme "manger"
    # la Lemmatisation est une sorte de factorisation de mots
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # on avait des tokens i.e on avait '['Je', 'vais', 'au', 'supermarché']' et maintenant cela va devenir "aller supermarché"
    # donc on passe d'une liste de mots à une chaîne de caractère tokenisé et lemmatisé
    # donc là on fait la reconstruction du texte
    preprocessed_text = ' '.join(tokens)

    return preprocessed_text


print("\ndeux descriptions avant pre-process\n")
print(df.loc[20, 'resume']) # 19033
df['resume'] = df.apply(preProcessing_description, axis=1) # rappel : axis = 1  première ligne
print("\ndeux descriptions après pre-process\n")
print(df.loc[20, 'resume'])

#df.to_excel('df.xlsx', index=False)

# --------------- Vectorisation de la colonne description -------------------

vectorizer = TfidfVectorizer(max_features=1000, min_df=10, max_df=0.85)
descriptions_vectorized = vectorizer.fit_transform(df['resume'])
features = vectorizer.get_feature_names()


from sklearn.cluster import KMeans

# Définir le nombre de clusters
k = 20 # essayer 20 clusters
# Créer une instance de l'algorithme K-means
kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
# Appliquer l'algorithme K-means sur les données vectorisées
clusters = kmeans.fit_predict(descriptions_vectorized)
# Ajouter les étiquettes de cluster au DataFrame
df['cluster'] = clusters


# Obtenir les centres de cluster
centers = kmeans.cluster_centers_

# Obtenir les mots les plus pertinents pour chaque centre de cluster
num_words = 20
top_words = []
for center in centers:
    # Obtenir les indices des mots les plus importants (ceux avec les valeurs les plus élevées)
    top_word_indices = center.argsort()[-num_words:][::-1]
    # Obtenir les mots correspondants à ces indices
    top_words.append([vectorizer.get_feature_names()[i] for i in top_word_indices])

# Afficher les mots dans chaque cluster
for i, words in enumerate(top_words):
    print(f"Cluster {i+1}: {', '.join(words)}")

import matplotlib.pyplot as plt

# Liste pour stocker les valeurs de l'inertie
inertias = []

# Essayer différents nombres de clusters de 2 à 10
for k in range(2, 20):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(descriptions_vectorized)
    inertias.append(kmeans.inertia_)

# Tracer la courbe d'inertie
plt.plot(range(2, 20), inertias, marker='o')
plt.xlabel('Nombre de clusters')
plt.ylabel("Inertie")
plt.title("Méthode du coude")
plt.show()

def analyse_cluster(int): # int est un entier entre 1 et 1000 (les lignes)
    cluster_1_books = df[df['cluster'] == int]
    from collections import Counter
    cluster_1_keywords = ' '.join(cluster_1_books['resume']).split()
    keyword_counts = Counter(cluster_1_keywords)
    top_keywords = keyword_counts.most_common(10)
    print(top_keywords)
    top_authors = cluster_1_books['auteur'].value_counts().head(10)
    print(top_authors)
    top_genres = cluster_1_books['genres'].value_counts().head(10)
    print(top_genres)


"""analyse_cluster(1)
analyse_cluster(9)
analyse_cluster(14)"""


inertia = kmeans.inertia_
print("Inertie :", inertia)

from sklearn.metrics import silhouette_score

labels = kmeans.labels_
silhouette_avg = silhouette_score(descriptions_vectorized, labels)
print("Silhouette moyenne :", silhouette_avg)


def trouver_livres_similaires(liste_livres):
    # Trouver les clusters correspondants aux livres de la liste donnée
    clusters = df.loc[df['reference'].isin(liste_livres), 'cluster'].values
    
    # Récupérer tous les autres livres des clusters correspondants
    similar_books = df.loc[df['cluster'].isin(clusters) & (~df['reference'].isin(liste_livres)), 'reference'].values
    
    # Retourner les livres similaires
    return similar_books


# Liste de livres donnée

liste_livres2 = ["2", "5", "6"]

# Appel de la fonction pour trouver les livres similaires

livres_similaires2 = trouver_livres_similaires(liste_livres2)


# Affichage des livres similaires

print("Livres similaires2 :", livres_similaires2)




