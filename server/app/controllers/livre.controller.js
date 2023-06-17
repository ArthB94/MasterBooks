const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");

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




