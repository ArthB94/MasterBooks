const sql = require("./db.js");

const Livre = function (livre) {
  this.titre = livre.titre;
  this.auteur = livre.auteur;
  this.genre = livre.genre;
  this.date_parution = livre.date_parution;
  this.pages = livre.pages;
  this.langue = livre.langue
  this.resume = livre.resume;
  this.image_src = livre.image_src;
  this.url = livre.url;
};

Livre.create = (newLivre, result) => {
  sql.query(
    "SELECT * FROM livre WHERE titre = ? AND auteur = ? AND pages = ? AND resume = ? AND url = ? AND date_parution = ? AND image_src = ? AND genre = ? AND langue = ?",
    [
      newLivre.titre,
      newLivre.auteur,
      newLivre.pages,
      newLivre.resume,
      newLivre.url,
      newLivre.date_parution,
      newLivre.image_src,
      newLivre.genre,
      newLivre.langue,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length > 0) {
        // Book with the same information already exists
        console.log("Book already exists: ", {
          titre: newLivre.titre,
          auteur: newLivre.auteur,
          pages: newLivre.pages,
          resume: newLivre.resume,
          url: newLivre.url,
          date_parution: newLivre.date_parution,
          image_src: newLivre.image_src,
          genre: newLivre.genre,
          langue: newLivre.langue,
        });
        result({ message: "Book already exists" }, null);
        return;
      }

      // No book with the same information found, proceed with insertion
      sql.query(
        "INSERT INTO livre (titre, auteur, pages, resume, url, date_parution, image_src, genre, langue) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          newLivre.titre,
          newLivre.auteur,
          newLivre.pages,
          newLivre.resume,
          newLivre.url,
          newLivre.date_parution,
          newLivre.image_src,
          newLivre.genre,
          newLivre.langue,
        ],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log("Added book: ", {
            titre: newLivre.titre,
            auteur: newLivre.auteur,
            pages: newLivre.pages,
            resume: newLivre.resume,
            url: newLivre.url,
            date_parution: newLivre.date_parution,
            image_src: newLivre.image_src,
            genre: newLivre.genre,
            langue: newLivre.langue,
          });
          result(null, { message: "Book added successfully" });
        }
      );
    }
  );
};

/*
Livre.create = (newLivre, result) => {
  sql.query(
    "INSERT INTO livre (titre, auteur, pages, resume, url, date_parution, image_src, genre, langue) VALUES (?,?,?,?,?,?,?,?,?)",
    [newLivre.titre, newLivre.auteur, newLivre.pages, newLivre.resume, newLivre.url, newLivre.date_parution, newLivre.image_src, newLivre.genre, newLivre.langue],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Added book : ", {
        titre: newLivre.titre,
        auteur: newLivre.auteur,
      });
      result(null, { message: "Book added successfully" });
    }
  );
};
*/

module.exports = Livre;