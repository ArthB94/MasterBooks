const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");
const Utilisateur = require("../models/utilisateur.model.js");

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
        titre : req.title,
        auteur : req.autor,
        genre : req.genre,
        date_parution : req.parution_date,
        nb_pages : req.nb_pages,
        langue : req.language,
        resume : req.summary,    
        image_src : req.image,
        url : req.url,
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
        if(err)
            res.status(500).send({
                message : err.message || "Some error occured while retrieving books"
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Livre.findById(req.params.reference, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message : `Not found Book with id ${req.params.reference}`
                });
            }else{
                res.status(500).send({
                    message : "Error retrieving Book with id " + req.params.reference
                });
            }
        }else res.send(data);
    });
}


// TODO: Ajuster la documentation ⥥

/**
 * Partage un livre.
 * 
 * Renvoie un token donnant l'accès à la lecture d'un livre pendant X mois (à déterminer.)
 * 
 * @link /api/livre/share
 *
 * @param {Object} req           La requête envoyée à l'API.
 * @param {Object} res           La réponse renvoyée par l'API.
 */
exports.share = (req, res) => {
    // 1. Récupérer les informations de la requête concernant l'utilisateur qui souhaite partager et le livre
    if (!req.body) {
        res.status(400).json({message: "Content cannot be empty!"});
    }

    const Info = {
        from_email: req.from_email,
        book: req.book
    };

    // 2. Vérifier possibilité de partager de la part de l'utilisateur
    // On récupère l'utilisateur
    const user_res = Utilisateur.get({email_user: req.from_email})
    if (user_res[0]) {
        // Il y a une erreur interne
        res.status(500).json({message: user_res[0]});
    }

    if (user_res[1] === false) {
        // Erreur 400 : mauvais paramètres
        res.status(400).json({message: "User does not exist!"});
    }

    // Aucune erreur, l'utilisateur a été trouvé
    const user = user_res[1];

    // 3. Générer le token pour le livre
    // TODO: Quelle technologie utiliser pour générer les tokens ?
    // + Créer modèle + contrôleur Token ?

    // 4. Ajouter le token à la base de données

    // 5. Retourner le token à l'utilisateur
}
