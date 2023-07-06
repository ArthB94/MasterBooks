const Livre = require("../models/livre.model.js");
const EPub = require("epub");
const Utilisateur = require("../models/utilisateur.model.js");
const ShareToken = require("../models/shareToken.model.js");
const Email = require("../models/email.model.js");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");
const fsExtra = require("fs-extra");
const sql = require("../models/db.js");
const { verifyResetToken, verif_token } = require('./utilisateur.controller');
const { isAdmin } = require("../models/utilisateur.model.js");
const { exec } = require('child_process');
const db = require('../config/db.config.js')

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
        filterQuerry += "JOIN être_recommandé using(reference) where (email_user = '" + utilisateur.email_user + "') ";
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
        and = true;

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
    if(filters.recommandés){
        filterQuerry += "ORDER BY Pourcentage DESC "
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

exports.getComments = (req,res) => { 
    if (!req.body.reference){
        res.status(500).json({error: "no reference"});
        return
    }
    sql.query("SELECT * FROM critiquer WHERE reference = ?",[req.body.reference],
    async (err,result) => {
        if (err){
            console.log("error: ",err);
            res.status(500).json({error: "An error occured while getting comments."});
            return;
        }
        console.log('comments fetched from the database')

        const querys = ((result) => {
            return new Promise((resolve, reject) => {
                sql.query("SELECT pseudo FROM utilisateur WHERE email_user = ?", [result.email_user], (err, row) => {
                    result["pseudo"] = row[0].pseudo;
                    resolve();
                });
            });
        });

        for (var i = 0; i < result.length; i++) {
            await querys(result[i])
        }

        res.json(result);
    })
}

// prend en paramtre "userData" "reference" "note" et "comment"
exports.addComment = (req,res)=>{
    console.log('body:' + JSON.stringify(req.body))
    if (req.body.userData){
        const userData = req.body.userData;
        console.log("userData:" + userData);
        if (userData.token){
            const token = userData.token
            console.log(JSON.stringify(verifyResetToken(token)))
            if (verifyResetToken(token) !=null){
                var email_user = verifyResetToken(token).email
            }else{
                console.log("Token corrupted");
                res.status(500).json({error: "Token corrupted"});
                return
            }
        }
        else{
            console.log("No Token in userData.");
            res.status(500).json({error: "No Token in userData."});
            return;
        }
    }
    else {
        console.log("No userData.");
        res.status(500).json({error: "No userData."});
        return;
    }
    if(req.body.reference){
        var reference = req.body.reference
    }
    else{
        console.log("No reference");
        res.status(500).json({error: "No reference."})
        return
    }
    if(req.body.note){
        var note = req.body.note;
    }else{
        console.log("No note.");
        res.status(500).json({error: "No note."})
        return
    }
    let comment = req.body.comment

    // On vérifie si une note / commentaire existe déjà
    sql.query("SELECT * FROM critiquer WHERE email_user = ? AND reference = ?", [email_user, reference], (error, rows) => {
        if (error) {
            console.log("Error: ", error);
            return;
        }
        if (rows.length >= 1) {
            // ça existe déjà, on update juste
            sql.query("UPDATE critiquer SET noter = ?, commenter = ? WHERE email_user = ? AND reference = ?", 
            [note, comment, email_user, reference], (err, result) => {
                if (err) {
                    console.log("error: ", err);
                    res.status(500).json({ error: "An error occurred while updating comment." });
                    return;
                }
                console.log('Updated user comment.');
                res.status(200).json(result);
            });
        } else {
            // ça n'existe pas, on insère
            sql.query("INSERT INTO critiquer VALUES(?,?,?,?)",[email_user,reference,note,comment],
            (err,result) => {
                if (err){
                    console.log("error: ",err);
                    res.status(500).json({error: "An error occured while inserting comment."});
                    return;
                }
                console.log('comments fetched from the database')
                res.status(200).json(result);
            });
        }
    });
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

/**
 * Partage un livre.
 * 
 * Renvoie un token donnant l'accès à la lecture d'un livre pendant 25 jours et envoie automatiquement un mail si le destinataire est spécifié.
 * 
 * Le corps de la requête doit contenir les informations suivantes :
 * - from_email : adresse e-mail de l'utilisateur qui partage le livre
 * - book : la référence du livre à partager
 * - to : l'adresse e-mail du destinataire à qui envoyer le mail
 * 
 * @link /api/livre/share
 *
 * @param {Object} req           La requête envoyée à l'API.
 * @param {Object} res           La réponse renvoyée par l'API.
 */
exports.share = (req, res) => {
    // 1. Récupérer les informations de la requête concernant l'utilisateur qui souhaite partager et le livre
    if (!req.body.from_email || !req.body.book_ref) {
        res.status(400).json({ message: "Request body cannot be empty!" });
        return;
    }

    const Info = {
        from_email: req.body.from_email,
        book_ref: req.body.book_ref,
        to: req.body.to
    };

    // 2. Vérifier possibilité de partager de la part de l'utilisateur
    // On vérifie que l'utilisateur existe, et on en profite pour récupérer son nom
    Utilisateur.get({ email_user: Info.from_email }, (err, result) => {
        if (err) {
            // Il y a une erreur interne
            res.status(500).json({ message: err });
            return;
        }

        if (result === false) {
            // Erreur 400 : mauvais paramètres
            res.status(400).json({ message: "User does not exist!" });
            return;
        }

        // Aucune erreur, l'utilisateur a été trouvé
        Info.from_name = result.pseudo;

        // On vérifie si l'utilisateur peut partager
        ShareToken.checkIfPossible(Info.from_email, (userCanShare) => {
            if (!userCanShare) {
                // L'utilisateur ne peut pas partager : il a déjà atteint sa limite
                res.status(400).json({ message: "User has shared too many books!" });
            } else {
                // On récupère le nom du livre
                Livre.findById(Info.book_ref, (err, book) => {
                    if (err) {
                        res.status(400).json({ message: "The book does not exist!" });
                    } else {
                        Info.book_name = book.titre;

                        // 3. Générer le token pour le livre
                        ShareToken.create(Info.book_ref, (token) => {
                            // 4. Ajouter le token à la base de données
                            var addedToDb = false;
                            ShareToken.addToDb(token, Info.from_email, Info.book_ref,
                                (err, result) => {
                                    if (err) {
                                        // Il y a eu une erreur
                                        res.status(500).json({ message: "An error occured while adding the token to the database." });
                                        return;
                                    } else {
                                        // 5. Si req.to existe, envoyer un mail au destinataire avec le lien vers le livre et le token
                                        if (Info.to != undefined) {
                                            // Info.to existe, on veut partager le mail
                                            var email = new Email({
                                                to: Info.to,
                                                subject: "A new book is waiting for you!",
                                                template: "email-share",
                                                context: {
                                                    from: Info.from_name,
                                                    book_name: Info.book_name,
                                                    link: "http://129.151.226.75:8081/book-read-page?url=" + book.url + "&ref=" + Info.book_ref + "&token=" + token
                                                },
                                                attachments: [
                                                    {
                                                        filename: "LogoJour.png",
                                                        path: "LogoJour.png",
                                                        cid: "image_cid"
                                                    }
                                                ]
                                            });
                                            Email.send(email, (emailWasSent) => {
                                                // 6. Retourner le token à l'utilisateur
                                                if (!emailWasSent) {
                                                    res.status(500).json({ message: "Could not send email!", token: token });
                                                } else {
                                                    res.status(200).json({ token: token });
                                                }
                                            });
                                        }
                                        return;
                                    }
                                }
                            );
                        });
                    }
                });
            }
        });
    });
};


exports.addReco = (req,res) => {
    if(!req.body.email_user){
        return res.status(500).send('pas de email_user dans body.')
    }
    exec(`python3 ${__dirname}/../config/main.py ${req.body.email_user} '${JSON.stringify(db)}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur d'exécution : ${error.message}`);
            return res.status(500).send('Erreur d\'exécution du code Python.'+error.message);
        }
        if (stderr) {
            console.error(`Erreur Python : ${stderr}`);
            return res.status(500).send('Erreur dans le code Python.');
        }
        const result = stdout.trim();
        console.log(result)
        res.send(result);
    });
}
