const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the destination directory



module.exports = app =>{
    const livres = require("../controllers/livre.controller.js");
    var router = require("express").Router();


    //------------pauline----------------
      // Set up multer storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        // Specify the directory where you want to store the uploaded files
        cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
        // Define the filename for the uploaded file
        const fileName = `${file.originalname}`;
        cb(null, fileName);
        },
    });
    const upload = multer({ storage : storage }); // Change 'uploads/' to the desired storage directory
    //------------------------------------fin pauline

    //retourne les livre selon une requette sql passé en parametre
    router.post("/filter", livres.findByFilter);


    //------------------------------------pauline

    // Prend en paramètre un fichier EPUB et retourne un objet JSON contenant les métadonnées du livre et 
    router.post("/metadata", upload.single('file'), livres.createmetadata); // Include the upload middleware here

    // ajoute un livre au format json à la base de données
    router.post('/store', livres.store);
    
    //retourne tous les genres de la base de données
    router.get('/getgenres', livres.getAllGenres);
      //------------------------------------fin pauline

      app.use('/api/livre', router);
}
