const Livre = require("../models/livre.model.js");
const EPub = require("epub");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");
const fsExtra = require("fs-extra");
const sql = require("../models/db.js");

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

//retourne les lires selon une requette sql
exports.findByFilter = (req, res) => {
    console.log("filter Parameters", req.body);
    const utilisateur = req.body.utilisateur;
    const filters ={
        texte: req.body.texte,
        genres: req.body.genres,
        langues: req.body.langues,
        pages: req.body.pages,
        date_parution: req.body.date_parution,
    }

    let filterQuerry = "Select * from livre ";
    let and = false;

    if (filters.texte != "") {
        filterQuerry += "where titre like '%" + filters.texte + "%' or auteur like '%" + filters.texte + "%' ";
        and = true;
    }
    if (filters.genres.length > 0) {
        if (!and) {
            filterQuerry += "where (";
            and = false
        }
        else {
            filterQuerry += "and ("
        }
        // select * from livre where reference in (select reference from appartenir where genre_id = 1);

        filterQuerry += "reference in (select reference from appartenir where genre_id = '" + filters.genres[0] + "') "
        for (let i = 1; i < filters.genres.length; i++) {
            filterQuerry += "and reference in (select reference from appartenir where genre_id = '" + filters.genres[i] + "') ";
        }
        filterQuerry += ") ";
        and = true;

    }
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
            filterQuerry += "livre.pages >= 100 and livre.pages < 500 ";
            or = true;
        }
        if (filters.pages.includes("500 ~ 1000")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "livre.pages >= 500 and livre.pages < 1000 ";
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


    let or = false;
    
    
    
    // for (let i = 0; i < filters.date_parution.length; i++) {
    //     if (!and) {
    //         filterQuerry += "where (";
    //         and = false
    //     }
    //     else {
    //         filterQuerry += "and ("
    //     }
    //     if (i == 0) {
    //         filterQuerry += "livre.date_parution <"+ filters.date_parution[i] + " ";
    //         or = true;
    //     }else if (i == filters.date_parution.length - 1) {
    //         filterQuerry += "livre.date_parution >="+ filters.date_parution[i] + " ";
    //         or = false;
    //     }
    //     filterQuerry += "livre.date_parution >="+ filters.date_parution[i-1] + "and livre.date_parution <"+ filters.date_parution[i] + " ";
    //     or = true;
        



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
            filterQuerry += "livre.date_parution >= 1980 and livre.date_parution < 2000 ";
            or = true;
        }
        if (filters.date_parution.includes("2000 ~ 2010")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "livre.date_parution >= 2000 and livre.date_parution < 2010 ";
            or = true;
        }
        if (filters.date_parution.includes("2010 ~ 2020")) {
            if (or) {
                filterQuerry += "or ";
            }
            filterQuerry += "livre.date_parution >= 2010 and livre.date_parution < 2020 ";
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
    Livre.getByFilter(filterQuerry, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving books"
            });
        else res.send(data);
        console.log("data", data);
    });

}














//retourne un livre à partir de son id
exports.findByID = (req, res) => {
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
    const destination = "./uploads";
    const filePath = `${destination}/${fileName}`;
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
    // Extract the EPub file
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

        // ---Début de l'extraction de la couverture
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

            // let opfDirectory = path.dirname(opfEntry.entryName); // Get the directory path of the OPF file

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
                const coversDir = path.join(__dirname, "../../covers");
                if (!fs.existsSync(coversDir)) {
                    fs.mkdirSync(coversDir);
                    console.log("Created covers directory.");
                } else {
                    console.log("Directory already existing !");
                }
                console.log("here");

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
            date_publication: toDate(epub.metadata.date).getFullYear(),
            langue: epub.metadata.language,
            resume: epub.metadata.description,
            url: filePath,
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