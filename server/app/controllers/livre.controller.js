const Livre = require("../models/livre.model.js");
const EPub = require("epub");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");
const fsExtra = require("fs-extra");
const sql = require("../models/db.js");
const { verifyResetToken, verif_token } = require('./utilisateur.controller');
const { isAdmin } = require("../models/utilisateur.model.js");

// Prend un livre en paramètre et le sauvegarde dans la base de données
exports.store = (req, res) => {
    const livre = new Livre({
        titre: req.body.titre,
        auteur: req.body.auteur,
        genres: req.body.genres,
        date_parution: req.body.date_parution,
        pages: req.body.pages,
        langue: req.body.langue,
        resume: req.body.resume,
        url: req.body.url,
        image_src: req.body.image_src, // Use the coverPath variable here
    });

    // Enregistre le livre dans la base de données uniquement si il n'existe pas déjà
    Livre.create(livre, (err, data) => {
        if (err) {
            console.log("error :", err);
            if (err.message === "Book already exists") {
                console.log(err.message);
                return res.json({ message: err.message });
            } else {
                console.log(err.message);
                return res.status(500).send({
                    message: err.message || "Some error occurred while storing the book.",
                });
            }
        } else {
            res.json({
                message: "Book added successfully",
                titre: livre.titre,
                auteur: livre.auteur,
            });
        }
    });
};
//delete un livre de la base de données et supprime le fichier epub  et images associés
exports.delete = (req, res) => {

    //vérifi si l'utilisateur est bien un admin
    let token = req.query.token
    email = verifyResetToken(token).email
    //construit les parametres de ma requette pour isAdmin
    function resIsAdmin(result) {return result};
    let reqIsAdmin = {body:{email_user:email}}
    isAdmin(reqIsAdmin,resIsAdmin)

    if (resIsAdmin){
            //vérifie si le livre existe dans la base de données
        Livre.findById(req.params.id, (err, data) => {
            if (err) {
                console.log("error :", err);
                return res.status(500).send({
                    message: err.message || "Some error occurred while deleting the book.",
                });
            } else {
                // delete le fichier epub
    
                console.log("livre trouvé");
                const filePath = path.join(__dirname, "../../public/" + data.url);
                fsExtra.remove(filePath, (err) => {
                    if (err) {
                        console.log("error :", err);
                        return res.status(500).send({
                            message: err.message || "Some error occurred while deleting the book.",
                        });
                    } else {
                        // delete le directory des images
                        
                        const imagesPath = path.join(__dirname, "../../public/" + data.image_src);
                        console.log("fichier epub supprimé");
                        console.log(path.dirname(imagesPath));
                        fsExtra.remove(path.dirname(imagesPath), (err) => {
                            if (err) {
                                console.log("error :", err);
                                return res.status(500).send({
                                    message: err.message || "Some error occurred while deleting the book.",
    
                                });
                            } else {
                                console.log("directory images supprimé");
                                // delete le livre de la base de données
                                Livre.delete(req.params.id, (err, data) => {
                                    if (err) {
                                        console.log("error :", err);
                                        return res.status(500).send({
                                            message: err.message || "Some error occurred while deleting the book.",
                                        });
                                    } else {
                                        console.log("livre db supprimé");
                                        res.json({
                                            message: "Book deleted successfully",
                                            titre: data.titre,
                                            auteur: data.auteur,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }else {
        return res.status(500).send({
            message: "You are not admin",
        });
    }
    
};



//retourne les lires selon une requette sql
exports.findByFilter = (req, res) => {
    if (!req.body.token){
        console.log("No authentification Token in body.")
        res.status(500).json({error: "No authentification Token in body."});
        return;
    }
    const token = req.body.token;
    if (!verifyResetToken(token)){
        console.log("Token invalide:",token)
        res.status(500).json({error: "Token invalide"});
        return;
    }
    const email = verifyResetToken(token).email;  
    if(!email){
        console.log("No email in token")
        res.status(500).json({error: "No email in token"});
        return;
    }
   
    const utilisateur = {email_user: email};
    const filters ={
        texte: req.body.texte,
        genres: req.body.genres,
        langues: req.body.langues,
        pages: req.body.pages,
        date_parution: req.body.date_parution,
        aimés: req.body.liked,
        lus: req.body.read,
        recommandés: req.body.recomanded,
    }

    let filterQuerry = "Select * from livre ";
    let and = false;
    let or = false;

    if(filters.recommandés){
        filterQuerry += "join être_recommandé using(reference) where (email_user = '" + utilisateur.email_user + "') ";
        and = true;
    }

    //filtre barre de recherche
    if (filters.texte != "") {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }
        filterQuerry += "titre like '%" + filters.texte + "%' or auteur like '%" + filters.texte + "%' )";
        and = true;
    }

    //filtre aimés
    if (filters.aimés == true) {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }

        filterQuerry += "reference in (select reference from sauvegarder where email_user = '" + utilisateur.email_user + "') "
        if (filters.lus == true) {
            or = true;
        }
        else {
            filterQuerry += ") ";
        }
        and = true;

    }

    //filtre lus
    if (filters.lus == true) {
        if (or) {
            filterQuerry += "or "
            or = false;

        }
        else if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }

        filterQuerry += "reference in (select reference from lire where email_user = '" + utilisateur.email_user + "') "
        filterQuerry += ") ";

        and = true;

    }

    //filtre genres
    if (filters.genres.length > 0) {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }

        filterQuerry += "reference in (select reference from appartenir where genre_id = '" + filters.genres[0] + "') "
        for (let i = 1; i < filters.genres.length; i++) {
            filterQuerry += "and reference in (select reference from appartenir where genre_id = '" + filters.genres[i] + "') ";
        }
        filterQuerry += ") ";
        and = true;

    }

    //filtre langues
    if (filters.langues.length > 0) {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }
        filterQuerry += "livre.langue = '" + filters.langues[0] + "' ";
        filterQuerry += ") ";

    }

    //filtre pages
    if (filters.pages.length > 0) {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }
        let or = false;

        if (filters.pages.includes("Under 100")) {

            filterQuerry += "livre.pages < 100 ";
            or = true;

        }
        if (filters.pages.includes("100 ~ 500")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "(livre.pages >= 100 and livre.pages < 500) ";
            or = true;
        }
        if (filters.pages.includes("500 ~ 1000")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "(livre.pages >= 500 and livre.pages < 1000) ";
            or = true;

        }
        if (filters.pages.includes("Over 1000")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "livre.pages >= 1000 ";
            or = true;

        }
        filterQuerry += ") "
        or = false
        and = true

    }
    
    //filtre date de parution
    if (filters.date_parution.length > 0) {
        
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }
        if (filters.date_parution.includes("Before 1980")) {
            filterQuerry += "livre.date_parution < 1980 ";
            or = true;
        }
        if (filters.date_parution.includes("1980 ~ 2000")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "(livre.date_parution >= 1980 and livre.date_parution < 2000) ";
            or = true;
        }
        if (filters.date_parution.includes("2000 ~ 2010")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "(livre.date_parution >= 2000 and livre.date_parution < 2010) ";
            or = true;
        }
        if (filters.date_parution.includes("2010 ~ 2020")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "(livre.date_parution >= 2010 and livre.date_parution < 2020) ";
            or = true;
        }
        if (filters.date_parution.includes("After 2020")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "livre.date_parution >= 2020 ";
            or = true;
        }
        filterQuerry += ") "

    }
    console.log(filters);
    Livre.getByFilter(filterQuerry, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving books"
            });
        else res.send(data);
        //console.log("data", data);
    });

}


//retourne un livre à partir de son id
exports.findByID = (req, res) => {
    if (!req.params.reference){
        res.status(500).send("Error 'reference' not found in params");
        return
    }
    Livre.getById(req.params.reference, (err, data) => {
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
};


// Prend en paramètre un fichier EPUB et retourne un objet JSON contenant les métadonnées du livre
exports.createmetadata = (req, res) => {
    // Validate request
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const fileName = req.file.originalname;
    const destination = "./public/uploads";
  
    const filePath = `${destination}/${fileName}`;
    const filePathdb = `./uploads/${fileName}`;
  
    const epub = new EPub(filePath);
  
    epub.on("error", (err) => {
      console.error("Error parsing EPub file:", err);
      // Remove the uploaded file if there is an error parsing the EPub file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
      return res.status(500).send("Error parsing EPub file.");
    });
  
    const zip = new AdmZip(filePath);
  
    // Extract the OPF file
    const opfEntry = zip
      .getEntries()
      .find((entry) => entry.entryName.endsWith(".opf"));
    if (!opfEntry) {
      console.log("OPF file not found in the EPUB.");
      return;
    }
  
    const opfData = zip.readAsText(opfEntry);
    console.log("OPF file extracted successfully!");
    let epubName;
    let coverFilePath;
    let coverPath;
  
    // Parse the OPF data
    const parser = new xml2js.Parser();
    parser.parseString(opfData, (parseErr, result) => {
      if (parseErr) {
        console.error("Error parsing OPF file:", parseErr);
        return;
      }
  
      // Extract the content of the <meta> element with name="cover"
      const metaElements = result.package.metadata[0].meta;
      let coverContent;
  
      for (const meta of metaElements) {
        if (meta.$.name === "cover") {
          coverContent = meta.$.content;
          break;
        }
      }
  
      if (coverContent) {
        console.log("Cover content:", coverContent);
  
        // Find the href of the item with matching id
        const manifestElements = result.package.manifest[0].item;
  
        let coverHref;
        for (const item of manifestElements) {
          if (item.$.id === coverContent) {
            coverHref = item.$.href; // Prepend the OPF directory path to the coverHref
            break;
          }
        }
  
        coverHref = coverHref.split("/")[coverHref.split("/").length - 1];
  
        if (coverHref) {
          console.log("Cover href:", coverHref);
  
          // Create the covers directory if it doesn't exist
          const coversDir = path.join(__dirname, "../../public/covers");
          if (!fs.existsSync(coversDir)) {
            fs.mkdirSync(coversDir);
            console.log("Created covers directory.");
          } else {
            console.log("Directory already existing !");
          }
          console.log("here");
  
          // const coverEntry = zip.getEntry(coverHref);
  
          // Retrieve all entries from the ZIP archive
          const entries = zip.getEntries();
  
          // Search for the entry by filename
          let coverEntry = null;
          for (const entry of entries) {
            if (
              entry.entryName.endsWith(`/${coverHref}`) ||
              entry.entryName.endsWith(`${coverHref}`)
            ) {
              coverEntry = entry;
              break;
            }
          }
  
          if (coverEntry) {
            console.log("Entry found:", coverEntry.entryName);
            // Perform operations with the entry
          } else {
            console.log("Entry not found.");
          }
  
          // Extract the cover image and save it to the covers directory
          //const coverEntry = zip.getEntry(coverHref);
          //const coverEntry = zip.getEntry(`OEBPS/${coverHref}`);
          if (coverEntry) {
            // Extract the EPUB name without the extension
            epubName = path.parse(fileName).name;
            const coverFileName = `${epubName}`; // Rename the cover image
            coverFilePath = path.join(coversDir, coverFileName);
            zip.extractEntryTo(coverEntry, coverFilePath, false, true);
            console.log(
              "Cover image extracted and saved successfully:",
              coverFilePath
            );
  
            // Delete the opf directory and its contents
            const opfDir = path.join(__dirname, "opf");
            fsExtra.removeSync(opfDir);
            console.log("OPF directory deleted:", opfDir);
  
            coverPath = `./covers/${epubName}/${coverHref}`;
            console.log("cover path:", coverPath);
  
            // Use the coverPath variable here or call a function that depends on it
            // ...
            console.log("test");
          } else {
            console.log("Cover item not found in EPUB.");
          }
        } else {
          console.log("Cover item not found in manifest.");
        }
      } else {
        console.log("Cover meta element not found.");
      }
    });
    epub.on("end", () => {
      // Create a Book
      res.json({
        titre: epub.metadata.title,
        auteur: epub.metadata.creator,
        genre: epub.metadata.subject,
        date_parution: toDate(epub.metadata.date).getFullYear(),
        langue: epub.metadata.language,
        resume: epub.metadata.description,
        url: filePathdb,
        image_src: coverPath, // Use the coverPath variable here
      });
    });
    epub.parse();
  };

// retourne tous les genres de la base de données
exports.getAllGenres = (req, res) => {
    sql.query("SELECT * FROM genre", (err, result) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).json({ error: "An error occurred while fetching genres." });
            return;
        }
        console.log("Genres fetched from the database");
        res.json(result);
    });
}
// Convert a string to a Date object
function toDate(value) {
    if (value instanceof Date) {
        return value; // Return the value as is if it's already a Date object
    } else {
        return new Date(value); // Convert the value to a Date object
    }
}

exports.getComments = (req,res)=>{
    if (!req.body.reference){
        res.status(500).json({error: "no reference"});
        return
    }
    sql.query("SELECT * FROM critiquer WHERE reference = ?",[req.body.reference],
    (err,result) => {
        if (err){
            console.log("error: ",err);
            res.status(500).json({error: "An error occured while getting comments."});
            return;
        }
        console.log('comments fetched from the database')
        res.json(result);
    })
}

// prend en paramtre "userData" "reference" "note" et "comment"
exports.addComment = (req,res)=>{
    console.log(JSON.stringify(req.body))
    if (req.body.userData){
        const userData = req.body.userData
        if (userData.token){
            const token = userData.token
            console.log(JSON.stringify(verifyResetToken(token)))
            if (verifyResetToken(token) !=null){
                var email_user = verifyResetToken(token).email
            }else{
                res.status(500).json({error: "Token corrupted"});
                return
            }
        }
        else{
            res.status(500).json({error: "No Token in userData."});
            return;
        }
    }
    else {
        res.status(500).json({error: "No userData."});
        return;
    }
    if(req.body.reference){
        var reference = req.body.reference
    }
    else{
        res.status(500).json({error: "No reference."})
        return
    }
    if(req.body.note){
        var note = req.body.note;
    }else{
        res.status(500).json({error: "No note."})
        return
    }
    let comment = req.body.comment

    sql.query("INSERT INTO critiquer VALUES(?,?,?,?)",[email_user,reference,note,comment],
    (err,result) => {
        if (err){
            console.log("error: ",err);
            res.status(500).json({error: "An error occured while getting comments."});
            return;
        }
        console.log('comments fetched from the database')
        res.json(result);
    })

}

exports.getInfo = (req, res) => {
    console.log("bookId: " + JSON.stringify(req.body.ref));
    Livre.findById(req.body.ref, (err, result) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }
        console.log(result);
        res.status(200).json(result);
    });
};

exports.isInPersonalList = (req, res) => {
    if (req.body.ref === undefined || req.body.email_user === undefined) {
        res.status(400).json({ message: "Body cannot be empty or incomplete!" });
        return;
    }

    var bookId = req.body.ref;
    var email_user = req.body.email_user;

    sql.execute("SELECT * FROM sauvegarder WHERE email_user = ? AND reference = ?", [email_user, bookId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error });
            return;
        }

        if (result.length >= 1)
            res.status(200).json({ isInPersonalList: true });
        else
            res.status(200).json({ isInPersonalList: false });

        return;
    });
};

exports.toggleFromPersonalList = (req, res) => {
    if (req.body.ref === undefined || req.body.email_user === undefined) {
        res.status(400).json({ message: "Body cannot be empty or incomplete!" });
        return;
    }

    var bookId = req.body.ref;
    var email_user = req.body.email_user;

    console.log(bookId);
    console.log(email_user);

    sql.execute("SELECT * FROM sauvegarder WHERE email_user = ? AND reference = ?", [email_user, bookId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error });
            return;
        }

        if (result.length >= 1)
            sql.execute("DELETE FROM sauvegarder WHERE email_user=? AND reference=?", [email_user, bookId], (error, result) => {
                if (error) {
                    res.status(500).json({ message: error });
                    return;
                }
        
                res.status(200).json({ message : "Removed book from personal list." });
            });
        else
            sql.execute("INSERT INTO sauvegarder (email_user, reference) VALUES (?, ?)", [email_user, bookId], (error, result) => {
                if (error) {
                    res.status(500).json({ message: error });
                    return;
                }
        
                res.status(200).json({ message : "Added book to personal list." });
            });

        return;
    });
}

exports.hadBeenRead = (req, res) => {
    if (req.body.ref === undefined || req.body.email_user === undefined) {
        res.status(400).json({ message: "Body cannoy be empty or incomplete!" });
        return;
    }

    var bookId = req.body.ref;
    var email_user = req.body.email_user;

    sql.execute("SELECT * FROM lire WHERE email_user = ? AND reference = ?", [email_user, bookId], (error, result) => {
        if (error) {
            res.status(500).json({ message: error });
            return;
        }

        if (result.length >= 1)
            res.status(200).json({ hasBeenRead: true });
        else
            res.status(200).json({ hasBeenRead: false });

        return;
    });
}

exports.toggleRead = (req, res) => {
    if (req.body.ref === undefined || req.body.email_user === undefined) {
        res.status(400).json({ message: "Body cannoy be empty or incomplete!" });
        return;
    }

    var bookId = req.body.ref;
    var email_user = req.body.email_user;

    sql.execute("SELECT * FROM lire WHERE email_user = ? AND reference = ?", [email_user, bookId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: error });
            return;
        }

        if (result.length >= 1)
            sql.execute("DELETE FROM lire WHERE email_user=? AND reference=?", [email_user, bookId], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: error });
                    return;
                }
        
                res.status(200).json({ message : "Removed book from list of books already read." });
            });
        else
            sql.execute("INSERT INTO lire (email_user, reference) VALUES (?, ?)", [email_user, bookId], (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: error });
                    return;
                }
        
                res.status(200).json({ message : "Added book to list of books already read." });
            });

        return;
    });
}