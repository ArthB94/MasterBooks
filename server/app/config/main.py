# COPIE DE LA VERSION QUE J'AI FINI DIMANCHE SOIR QUI FONCTIONNE BIEN

import pandas as pd 
from nltk.corpus import stopwords 
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import string 
from sklearn.cluster import KMeans
from sklearn import metrics 
from sklearn.feature_extraction.text import TfidfVectorizer 
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from collections import Counter
from sklearn.metrics import silhouette_score
import pandas as pd
from sklearn.metrics.pairwise import pairwise_distances


# Téléchargement des ressources nécessaires pour NLTK
"""
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
"""

# import pour db
import mysql.connector
import json
import sys


email_user = sys.argv[1]
jsonConnect = sys.argv[2]
config = json.loads(jsonConnect)
print(jsonConnect)

# Établir la connexion à la base de données
connection = mysql.connector.connect(
    host = config['HOST'],
    user = config['USER'],
    password = config['PASSWORD'],
    database = config['DB']  
)

# Vérifier si la connexion a réussi
if connection.is_connected():
    print("Python connecté à la base de données MySQL Workbench")

# Créer un curseur pour exécuter la requête
cursor = connection.cursor()

# Exécuter la requête
query = """
SELECT l.reference, l.titre, l.auteur, l.pages, l.resume, l.date_parution, l.langue,
       CASE WHEN r.email_user IS NULL THEN FALSE ELSE TRUE END AS lecture,
       GROUP_CONCAT(a.genre_id SEPARATOR ', ') AS genres
FROM livre l
LEFT JOIN lire r ON l.reference = r.reference AND r.email_user = '"""+ email_user +"""'
LEFT JOIN appartenir a ON l.reference = a.reference
GROUP BY l.reference;
"""
print(query)

dataframe = pd.read_sql(query, connection)
def get_references_lecture(dataframe):
    references = dataframe.loc[dataframe['lecture'] == 1, 'reference'].tolist()
    return references
livres_lus = get_references_lecture(dataframe)
print (len(livres_lus))
if (len(livres_lus)>1):
        
    # ------------------------------ Pre-processing sur le dataframe ------------------------------



    # supprimer les lignes du dataframe qui contiennent au moins une valeur manquante donc un NaN
    dataframe = dataframe.dropna(how="any")

    langues_a_supprimer = ['others'] 
    dataframe = dataframe.drop(dataframe[dataframe['langue'].isin(langues_a_supprimer)].index)


    df = dataframe

    print(df)

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

        tokens = [token for token in tokens if token not in stop_words]

        tokens = [lemmatizer.lemmatize(token) for token in tokens]

        preprocessed_text = ' '.join(tokens)

        return preprocessed_text



    df['resume'] = df.apply(preProcessing_description, axis=1) # rappel : axis = 1  première ligne

    # --------------- Vectorisation de la colonne description -------------------

    vectorizer = TfidfVectorizer()# TfidfVectorizer(max_features=1000, min_df=3, max_df=0.85)
    descriptions_vectorized = vectorizer.fit_transform(df['resume'])
    features = vectorizer.get_feature_names()


    k = 5
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(descriptions_vectorized)
    df['cluster'] = clusters


    # Obtenir les centres de cluster
    centers = kmeans.cluster_centers_

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




    def analyse_cluster(int): # int est un entier entre 1 et 1000 (les lignes)
        cluster_1_books = df[df['cluster'] == int]
        cluster_1_keywords = ' '.join(cluster_1_books['resume']).split()
        keyword_counts = Counter(cluster_1_keywords)
        top_keywords = keyword_counts.most_common(10)
        print(top_keywords)
        top_authors = cluster_1_books['auteur'].value_counts().head(10)
        print(top_authors)
        top_genres = cluster_1_books['genres'].value_counts().head(10)
        print(top_genres)


    inertia = kmeans.inertia_
    print("Inertie :", inertia)



    labels = kmeans.labels_
    silhouette_avg = silhouette_score(descriptions_vectorized, labels)
    print("Silhouette moyenne :", silhouette_avg)



    def trouver_livres_similaires(liste_livres):
        # Trouver les clusters correspondants aux livres de la liste donnée
        clusters = df.loc[df['reference'].isin(liste_livres), 'cluster'].values
        
        # Récupérer tous les autres livres des clusters correspondants où 'lire' vaut False
        similar_books = df.loc[(df['cluster'].isin(clusters)) & (~df['reference'].isin(liste_livres)) & (df['lecture'] == 0), 'reference'].values
        
        # Obtenir les descriptions des livres de la liste donnée
        descriptions_liste_livres = descriptions_vectorized[df['reference'].isin(liste_livres)]
        
        # Obtenir les descriptions des livres similaires
        descriptions_similar_books = descriptions_vectorized[df['reference'].isin(similar_books)]
        
        # Calculer les distances entre les livres recommandés et la liste de livres donnée
        distances = pairwise_distances(descriptions_similar_books, descriptions_liste_livres)
        
        # Convertir les distances en pourcentage
        max_distance = distances.max()
        similarity_percentages = 100 - (distances / max_distance) * 100
        similarity_percentages = np.round(100 - similarity_percentages,0)
        
        # Créer un DataFrame contenant les livres recommandés et les pourcentages
        result_df = pd.DataFrame({'reference': similar_books, 'Pourcentage': similarity_percentages.max(axis=1)})

        # Ajouter la colonne email_user avec l'email spécifié
        result_df = result_df.assign(email_user = email_user)
        
        # Trier le DataFrame par ordre décroissant selon la colonne "pourcentage"
        result_df = result_df.sort_values(by='Pourcentage', ascending=True)
        
        # Sélectionner les trois premières lignes
        result_df = result_df.head(6)
        
        # Réinitialiser les index du DataFrame
        result_df = result_df.reset_index(drop=True)
        
        # Retourner le DataFrame des livres recommandés avec les trois plus hauts pourcentages
        return result_df



    resultat = trouver_livres_similaires(livres_lus)
    print(resultat)

    # supprimer tout le contenue de être_recommandé à chaque fois
    delete_query = "DELETE FROM être_recommandé WHERE email_user = '"+email_user+"'"

    # Exécuter la requête DELETE
    cursor.execute(delete_query)

    # Valider la suppression
    connection.commit()

    # Parcourir les lignes du DataFrame et insérer chaque ligne dans la table être_recommandé
    for index, row in resultat.iterrows():
        email_user = email_user  # Récupérer la valeur de email_user (remplacer par votre code)
        reference = row['reference']
        pourcentage = row['Pourcentage']
        
        # Requête SQL d'insertion
        insert_query = "INSERT INTO être_recommandé (email_user, reference, Pourcentage) VALUES (%s, %s, %s)"
        
        # Exécuter la requête d'insertion avec les valeurs correspondantes
        cursor.execute(insert_query, (email_user, reference, pourcentage))

    # Valider les insertions
    connection.commit()
else :
    print ("L'utilisateur n'a pas lu de livre")
# Fermer le curseur et la connexion
cursor.close()
connection.close()
