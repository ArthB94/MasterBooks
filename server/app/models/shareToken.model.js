const sql = require("./db.js"); // Importation de la base de données
var jwt = require('jsonwebtoken'); // Importation de la librairie pour générer les jwt

const sharingDuration = '25d'; // Durée de validité des tokens de partage.
const sharingLimit = 3; // Limite de partages tous les 25 jours.


// Déclaration de la structure d'un token
const shareToken = function (shareToken) {
    this.from = shareToken.from;
    this.book = shareToken.book;
};

// Mot de passe utilisé pour chiffrer et déchiffrer les tokens
const shareTokenPassword = "mastercampmdp";

/**
 * Crée un nouveau token de partage.
 * 
 * @param {string} from Adresse e-mail de l'utilisateur qui partage le livre.
 * @param {int} book Référence du livre.
 * 
 * @returns {shareToken} Le token nouvellement créé.
 */
shareToken.create = (from, book) => {
    // TODO: Ajouter la date d'expiration du token
    var token = jwt.sign({ from: from, book: book }, shareTokenPassword, { expiresIn: sharingDuration });

    return token;
};

/**
 * Ajoute un token à la base de données.
 * 
 * @param {shareToken} token Le token de partage.
 * @param {string} from L'adresse e-mail de l'utilisateur qui partage le livre.
 * @param {int} book La référence du livre à partager. 
 * @param {Object} result Le résultat de la fonction (any, any). 
 */
shareToken.addToDb = (token, from, book, result) => {
    // Remarque : 
    // On part du principe qu'on a déjà vérifié si l'utilisateur pouvait partager un livre.

    // On insère le token dans la base de données
    sql.execute(
        "INSERT INTO shareTokens (token, from, book, expires) VALUES (?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 25 DAY));",
        [token, from, book],
        (err, rows) => {
            // On vérifie s'il y a eu une erreur
            if (err) {
                console.log("Error:", err);
                result(err, null);
                return;
            }

            // Aucune erreur, on retourne OK
            result(null, true);
            return;
        }
    );
};

// TODO: Changer la limite du nombre de partages si besoin.
/**
 * Vérifie si un utilisateur peut partager un livre.
 * 
 * @param {string} user_email L'adresse e-mail de l'utilisateur qui souhaite partager un livre.
 * 
 * @returns {boolean} Vrai si l'utilisateur peut, faux s'il ne peut pas ou s'il y a une erreur.
 */
shareToken.checkIfPossible = (user_email) => {
    sql.execute("SELECT * FROM shareTokens WHERE from = ? AND expires > CURDATE() LIMIT ?", [user_email, sharingLimit], (err, rows) => {
        if (err) {
            // Il y a eu une erreur
            console.log("Error: ", err);
            return false;
        }

        if (rows.length === sharingLimit) // La limite pour l'instant est de trois partages tous les 25 jours.
            return false;
        return true;
    });
}

/**
 * Vérifie si un utilisateur peut partager un livre.
 * 
 * Cette fonction est exposée depuis une route et fait appel à la fonction interne checkIfPossible().
 * 
 * @param {*} req La requête
 * @param {*} res La réponse
 * @returns {json} possible: boolean
 */
shareToken.getCheckIfPossible = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body cannot be empty!" })
    }

    res.status(200).json({ possible: this.checkIfPossible(req.user_email)});
    return;
}

/**
 * Retoune la limite actuelle de livres.
 * 
 * Cette fonction est exposée via la route GET /api/shareToken/getLimit. 
 * 
 * @param {*} req La requête
 * @param {*} res La réponse
 * 
 * @returns {json} limit: int
 */
shareToken.getLimit = (req, res) => {
    res.status(200).json({ limit: sharingLimit });
}

/**
 * Retourne le nombre de partages encore possibles.
 * 
 * Cette fonction est exposée depuis une route GET. 
 * 
 * Elle prend en paramètre :
 * - email_user : l'adresse e-mail de l'utilisateur à vérifier
 * 
 * @param {*} req La requête
 * @param {*} res La réponse
 * 
 * @returns {json} message: string / left: int
 */
shareToken.getSharesLeft = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body cannot be empty!" });
        return;
    }

    sql.execute("SELECT * FROM shareTokens WHERE from = ? AND expires > CURDATE() LIMIT ?", [req.email_user, sharingLimit], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).json({ message: err });
            return;
        }

        res.status(200).json({ left: sharingLimit - rows.length });
        return;
    });
}

/**
 * Vérifie si un token de partage est valide.
 * 
 * @param {shareToken} shareToken Le token de partage à vérifier.
 * @param {boolean} result La résultat de la fonction.
 */
shareToken.verify = (shareToken, result) => {
    result(jwt.verify(shareToken, shareTokenPassword));
    return;
};

/**
 * Récupère le contenu d'un token de partage sous format JSON.
 * 
 * @param {shareToken} shareToken Le token de partage.
 * @param {json?} result Le résultat de la fonction null / json.
 */
shareToken.decode = (shareToken, result) => {
    result(jwt.decode(shareToken));
    return;
};

module.exports = shareToken;
