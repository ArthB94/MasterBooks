const Livre = require("../models/livre.model.js");
const EPub = require("epub");
const multer = require("multer");
const axios = require('axios');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Create an instance of the multer middleware
const upload = multer({ storage: storage });

exports.create = (req, res) => {
  // Validate request
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.filename;
  const destination = './uploads';
  const filePath = `${destination}/${fileName}`;
  console.log("File Name :",filePath);

  const epub = new EPub(filePath);

  // Create a Book
  const livre = new Livre({
    titre: epub.metadata.title,
    auteur: epub.metadata.creator,
    pages: 200,
    genre: epub.metadata.subject,
    resume: epub.metadata.description,
    url: epub.metadata.url,
    date_publication: epub.metadata.date.getFullYear(),
    url_couverture: epub.metadata.cover
  });

  // Save the book in the database
  Livre.create(livre, (err, data) => {
    if (err) {
      // Remove the uploaded file if there is an error in the database operation
      const filePath = `${destination}/${fileName}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(500).send({
        message: err.message || "Some error occurred while storing the book.",
      });
    }

    res.json({
      message: "Book added successfully",
      titre: livre.titre,
      auteur: livre.auteur,
    });

    // Call the other route and pass the file name
    axios.post('/otherRoute', { fileName })
      .then((response) => {
        // Handle the response if needed
      })
      .catch((error) => {
        console.error(error);
      });
  });
};





/*const Livre = require("../models/livre.model.js");
const db = require("../models/db.js");
const EPub = require("epub");
const multer = require("multer");
const axios = require('axios');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    cb(null, file.originalname);
  },
});

// Create an instance of the multer middleware
const upload = multer({ storage: storage });

exports.create = (req, res) => {
  // Validate request
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = `${Date.now()}-${file.originalname}`;
  const destination = 'uploads';
  file.mv(`${destination}/${fileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while uploading the file.');
    }

    // File successfully uploaded and stored
    // Include the file name in the response
    res.json({ fileName });
  });

  const epub = new EPub(`${destination}/${fileName}`);

  // Create a Book
  const livre = new Livre({
    titre: epub.metadata.title,
    auteur: epub.metadata.creator,
    pages: 200,
    genre: epub.metadata.subject,
    resume: epub.metadata.description,
    url: epub.metadata.url,
    date_publication: epub.metadata.date.getFullYear(),
    url_couverture: epub.metadata.cover
  });

  // Save the book in the database
  Livre.create(livre, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error ",
      });
    else {
      res.json({
        message: "Book added succesfully",
        titre: livre.titre,
        auteur: livre.auteur,
      });
    }
  });
};*/
