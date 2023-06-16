const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");

exports.create = (req, res) =>{
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
}


