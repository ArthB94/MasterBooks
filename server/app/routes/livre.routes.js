const multer = require('multer');



module.exports = app =>{
    const livres = require("../controllers/livre.controller.js");
    var router = require("express").Router();


      // Set up multer storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        // Specify the directory where you want to store the uploaded files
        cb(null, "./public/uploads");
        },
        filename: function (req, file, cb) {
        // Define the filename for the uploaded file
        const fileName = `${file.originalname}`;
        cb(null, fileName);
        },
    });
    const upload = multer({ storage : storage }); // Change 'uploads/' to the desired storage directory

    //retourne les livre selon une requette sql passé en parametre
    router.post("/filter", livres.findByFilter);

    // Prend en paramètre un fichier EPUB et retourne un objet JSON contenant les métadonnées du livre et 
    router.post("/metadata", upload.single('file'), livres.createmetadata); // Include the upload middleware here

    // ajoute un livre au format json à la base de données
    router.post('/store', livres.store);

    //delete un livre de la base de données et supprime le fichier epub  et images associés
    router.delete('/delete/:id', livres.delete);
    
    //retourne tous les genres de la base de données
    router.get('/getgenres', livres.getAllGenres);

    router.post('/getComments',livres.getComments);

    router.post('/addComment',livres.addComment)

    // Retourne les informations d'un livre
    router.post('/getInfo', livres.getInfo);

    // Retourne si un livre est dans la liste personnelle d'un utilisateur
    router.post('/isInPersonalList', livres.isInPersonalList);

    // Ajoute un livre à la liste personnelle d'un utilisateur
    router.post('/toggleFromPersonalList', livres.toggleFromPersonalList);

    // Retourne si un livre a été lu par un utilisateur
    router.post('/hasBeenRead', livres.hadBeenRead);

    // Ajoute un livre comment ayant été lu par un utilisateur
    router.post('/toggleRead', livres.toggleRead);

    // Partager un livre
    router.post("/share", livres.share);

    router.post('/addReco',livres.addReco);

      app.use('/api/livre', router);
}
