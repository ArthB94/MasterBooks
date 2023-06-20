const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");
const Utilisateur = require("../models/utilisateur.model.js");
const ShareToken = require("../models/shareToken.model.js");

/*exports.create = (req, res) =>{
    // Validate request
    if(!req.file){
        res.status(400).send({
            message : "Content can not be empty !"
        });
    }

    const epub = new EPub(epubFilePath);

    // Create a Book
    const livre = new Livre({
        titre : epub.metadata.title,
        auteur : epub.metadata.creator,
        date_publication : epub.metadata.date,
        genre : epub.metadata.subject,
        resume : epub.metadata.description,
        url : epub.url,
        nb_pages : epub.nb_pages
    });

    // Save the user in the database
    Utilisateur.create(utilisateur, (err, data)=>{
        if(err)
            res.status(500).send({
                message : err.message || "Some error ",
            });
        else {
            res.json({message:"Book added succesfully", email : utilisateur.email_user, pseudo : utilisateur.pseudo});
        }
    })
}*/





exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }

    // Create a Book
    const livre = new Livre({
        titre: req.title,
        auteur: req.autor,
        genre: req.genre,
        date_parution: req.parution_date,
        nb_pages: req.nb_pages,
        langue: req.language,
        resume: req.summary,
        image_src: req.image,
        url: req.url,
    });

    console.log(livre);
    // Save the Book in the database
    Livre.create(livre, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Book"
            });
        else res.send(data);
    });

};

exports.findAll = (req, res) => {
    Livre.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving books"
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Livre.findById(req.params.reference, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Book with id ${req.params.reference}`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Book with id " + req.params.reference
                });
            }
        } else res.send(data);
    });
}

/**
 * Partage un livre.
 * 
 * Renvoie un token donnant l'accès à la lecture d'un livre pendant 25 jours et envoie automatiquement un mail si le destinataire est spécifié.
 * 
 * Le corps de la requête doit contenir les informations suivantes :
 * - from_email : adresse e-mail de l'utilisateur qui partage le livre
 * - book : la référence du livre à partager
 * - to : l'adresse e-mail du destinataire à qui envoyer le mail
 * 
 * @link /api/livre/share
 *
 * @param {Object} req           La requête envoyée à l'API.
 * @param {Object} res           La réponse renvoyée par l'API.
 */
exports.share = (req, res) => { 
    // 1. Récupérer les informations de la requête concernant l'utilisateur qui souhaite partager et le livre
    if (!req.body.from_email || !req.body.book) {
        res.status(400).json({ message: "Request body cannot be empty!" });
        return;
    }

    const Info = {
        from_email: req.body.from_email,
        book: req.body.book,
        to: req.body.to 
    };

    // 2. Vérifier possibilité de partager de la part de l'utilisateur
    // On vérifie que l'utilisateur existe
    // FIXME: Nécessaire ??
    Utilisateur.get({ email_user: Info.from_email }, (err, result) => {
        if (err) {
            // Il y a une erreur interne
            res.status(500).json({ message: err });
            return;
        }

        if (result === false) {
            // Erreur 400 : mauvais paramètres
            res.status(400).json({ message: "User does not exist!" });
            return;
        }

        // Aucune erreur, l'utilisateur a été trouvé

        // On vérifie si l'utilisateur peut partager
        ShareToken.checkIfPossible(Info.from_email, (result) => {
            if (!result) {
                // L'utilisateur ne peut pas partager : il a déjà atteint sa limite
                res.status(400).json({ message: "User has shared too many books!" });
            } else {
                // 3. Générer le token pour le livre
                ShareToken.create(Info.book, (token) => {
                    // 4. Ajouter le token à la base de données
                    var addedToDb = false;
                    ShareToken.addToDb(token, Info.from_email, Info.book,
                        (err, result) => {
                            if (err) {
                                // Il y a eu une erreur
                                res.status(500).json({ message: "An error occured while adding the token to the database." });
                                return;
                            } else {
                                // 5. Si req.to existe, envoyer un mail au destinataire avec le lien vers le livre et le token
                                if (Info.to != undefined) {
                                    // Info.to existe, on veut partager le mail

                                    // TODO: Envoyer un mail
                                }
                                
                                // 6. Retourner le token à l'utilisateur
                                res.status(200).json({ message: token });
                                return;
                            }
                        }
                    );
                });
            }
        });
    });
}
