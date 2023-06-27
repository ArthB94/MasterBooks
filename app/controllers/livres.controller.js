const Livre = require("../models/livre.model.js");
const EPub = require("epub");
const multer = require("multer");
const fs = require("fs");
const ePub = require("epubjs");
const JSZip = require("jszip");
const path = require("path");
const AdmZip = require("adm-zip");
const xml2js = require("xml2js");
const fsExtra = require("fs-extra");


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
      image_src: coverPath
    });
  });
  epub.parse();
};

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

  // Save the book in the database
  Livre.create(livre, (err, data) => {
    if (err) {
      console.log("error :", err);
      // Remove the uploaded file if there is an error in the database operation
      fs.unlink(req.body.url, (err) => {
        if (err) {
          console.error(err);
        }
      });
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

function toDate(value) {
  if (value instanceof Date) {
    return value; // Return the value as is if it's already a Date object
  } else {
    return new Date(value); // Convert the value to a Date object
  }
}
