import pandas as pd 
import random
# nltk permet de travailler sur des data qui sont des textes (des langues)
import nltk
from nltk.corpus import stopwords # utilisé dans le pre-processing
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import string

# Téléchargement des ressources nécessaires pour NLTK
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


# ------------------------------ Pre-processing sur le dataframe ------------------------------

dataframe = pd.read_csv('books_1.best_Books_Ever.csv');
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
dataframe['lire']= [random.choice([True,False]) for _ in range(len(dataframe))]
dataframe['sauvegarder']= [random.choice([True,False]) for _ in range(len(dataframe))]

print("\n----colonnes dataframe après ajout de lire et sauvegarder----\n")
print(dataframe.columns)


"""
Nous réalisons un clustering basé sur le contenue donc clustering qui utilise des données textuelles.
Pour cela, on doit supprimer les colonnes qui contiennent des valeurs numériques combien même elles puissent être
intéressantes (pages et publishDate).
On doit aussi supprimer les colonnes qui ne nous intéressent pas
"""
colonnes_a_supprimer = ['bookId', 'series', 'rating','isbn', 'characters', 'bookFormat', 'edition', 'publisher', 
                        'firstPublishDate', 'awards','numRatings', 'ratingsByStars', 'likedPercent', 'setting', 
                        'coverImg','bbeScore', 'bbeVotes', 'price','pages','publishDate']


# axis = 1 <== axe des colonnes
dataframe = dataframe.drop(colonnes_a_supprimer, axis=1)
print("\n----colonnes dataframe après suppression de certaines colonnes----\n")
print(dataframe.columns)
print("\n----Contenue dataframe après modification sur colonnes----\n")
print(dataframe)

# supprimer les lignes du dataframe qui contiennent au moins une valeur manquante donc un NaN
dataframe = dataframe.dropna(how="any")

# afficher les différentes langues de livres dans le csv
langues = dataframe['language'].unique()
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
langues_a_supprimer = ['Persian','Spanish',
 'Multiple languages', 'Portuguese', 'Indonesian', 'Turkish', 'Polish',
 'Bulgarian', 'Tamil', 'Japanese', 'Romanian', 'Italian',
 'Norwegian', 'Urdu', 'Dutch', 'Finnish','Marathi', 'Chinese', 
 'Swedish', 'Icelandic', 'Malayalam', 'Croatian',
 'Estonian', 'Greek, Modern (1453-)', 'Russian', 'Kurdish', 'Danish', 'Hindi',
 'Filipino; Pilipino', 'Serbian', 'Bengali', 'Malay', 'Catalan; Valencian',
 'Czech', 'Vietnamese', 'Armenian', 'Georgian', 'Kannada', 'Korean', 'Nepali',
 'Telugu', 'Hungarian', 'Farsi', 'Lithuanian',
 'Ukrainian', 'Bokmål, Norwegian; Norwegian Bokmål', 'Slovak', 'Faroese',
 'Basque', 'Macedonian', 'Maltese', 'Amharic', 'Assamese', 'Gujarati',
 'Panjabi; Punjabi', 'Albanian', 'Latvian', 'Bosnian', 'Thai',
 'Dutch, Middle (ca.1050-1350)', 'Mongolian', 'Tagalog', 'Galician', 'Aleut',
 'Slovenian', 'Undetermined', 'Greek, Ancient (to 1453)', 'Mayan languages',
 'Duala', 'Norwegian Nynorsk; Nynorsk, Norwegian',
 'Afrikaans'] 
dataframe = dataframe.drop(dataframe[dataframe['language'].isin(langues_a_supprimer)].index)

langues_save = dataframe['language'].unique()
print("\nToutes les langues qu'on veut garder : \n")
print(langues_save, "\nnb de langues_save : ", len(langues_save))

"""
fonction qui prend en paramêtre la langue et qui enlève tous les stop words ( = mots vide = mots pas important ) liés à cette langue
Ex : "GeeksforGeeks - A Computer Science Portal for Geeks" devient "GeeksforGeeks, Computer Science, Portal, Geeks"

"""

# Définition des caractères indésirables
carac_indesirables = string.punctuation + string.digits # retourne cela : !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0123456789

def espaceEntrePoint(ligne):
    for i in range(0)

# Initialisation du lemmatiseur
lemmatizer = WordNetLemmatizer() # retourne cela : <WordNetLemmatizer>

def preProcessing_description(ligne):

    text = ligne['description']
    language = ligne['language']

    #suppression des caractères indésirables
    text = ''.join(char for char in text if char not in carac_indesirables)

    # on met tout en minuscule
    text = text.lower()

    # tokenisation du texte, ex: on passe de "Je vais au supermarché" à '['Je', 'vais', 'au', 'supermarché']'
    tokens = word_tokenize(text)

    # définition des mots vides 
    if 'French' in language:
        stop_words = set(stopwords.words('french'))
    elif 'English' or 'Australian' in language:
        stop_words = set(stopwords.words('english'))
    elif 'German' in language:
        stop_words = set(stopwords.words('german'))
    else:
        stop_words = set(stopwords.words('arabic'))

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
print(dataframe.loc[19033, 'description'])
#print(dataframe[dataframe['language'] == 'French']['description'].values[0])
# Application du prétraitement sur les deux premières lignes de la colonne "description"
#dataframe.loc[:1, 'description'] = dataframe.loc[:1, 'description'].apply(preProcessing_description)

dataframe['description'] = dataframe.apply(preProcessing_description, axis=1) # rappel : axis = 1  première ligne
print("\ndeux descriptions après pre-process\n")
print(dataframe.loc[19033, 'description'])
#print(dataframe['French' in dataframe['language']]['description'].values[0])
#print("description après pre-processing: \n", dataframe['description'])