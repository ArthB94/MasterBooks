const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");





exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    
    // Create a Book
    console.log("-----------------------------------------mon nouveau livre");
    const livre = new Livre({
        titre : req.body.title,
        auteur : req.body.autor,
        genres : req.body.genres,
        date_parution : req.body.parution_date,
        nb_pages : req.body.numberOfPages,
        langue : req.body.language,
        resume : req.body.summary,    
        image_src : req.body.image,
        url : req.body.url,
    });
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

exports.findByFilter = (req, res) => {
    console.log("filterQuerry", req.body);
    Livre.getByFilter(req.body.querry, (err, data) => {
        if(err)
            res.status(500).send({
                message : err.message || "Some error occured while retrieving books"
            });
        else res.send(data);
        console.log("data", data);
    });
}

exports.findOne = (req, res) => {
    Livre.getById(req.params.reference, (err, data) => {
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




