const Genre = require("../models/genre.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    
    // Create a Genre
    console.log("mon nouveau genre",req.body);
    const genre = new Genre({
        nom : req.body.nom,
    });
    Genre.create(genre, (err, data)=>{
        if(err)
            res.status(500).send({
                message : err.message || "Some error ",
            });
        else {
            res.json({message:"Genre added succesfully"});
        }
    })
}



exports.findAll = (req, res) => {
    Genre.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error "
            });
        else res.send(data);
    });
}