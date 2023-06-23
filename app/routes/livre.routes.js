const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the destination directory
const sql = require("../models/db.js");

module.exports = app => {
  const livres = require("../controllers/livres.controller.js");
  var router = require("express").Router();

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

  router.post("/add", upload.single('file'), livres.create); // Include the upload middleware here

  router.post("/metadata", upload.single('file'), livres.createmetadata); // Include the upload middleware here

  router.get('/getgenres', (req, res) => {
    sql.query("SELECT * FROM genre", (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).json({ error: "An error occurred while fetching genres." });
        return;
      }
      console.log("Genres fetched from the database");
      res.json(result);
    });
  });

  router.post('/store', livres.store);

  app.use('/api/livre', router);
};

