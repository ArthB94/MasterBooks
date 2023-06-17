const sql = require("./db.js");



// constructeur et structure de l'objet Livre
const Livre = function (livre) {
  this.titre = livre.titre;
  this.auteur = livre.auteur;
  this.genre = livre.genre;
  this.date_parution = livre.date_parution;
  this.nb_pages = livre.nb_pages;
  this.langue = livre.langue;
  this.resume = livre.resume;
  this.image_src = livre.image_src;
  this.url = livre.url;

};


// methode pour créer un livre et l'ajouter à la base de données
Livre.create = (newLivre, result) => {
  sql.query(
    "INSERT INTO livre (titre, auteur, genre, date_parution, pages, langue, resume, image_src, url) VALUES (?,?,?,?,?,?,?,?)",
    [newLivre.titre, newLivre.auteur, newLivre.genre, newLivre.date_parution, newLivre.nb_pages, newLivre.langue, newLivre.resume, newLivre.image_src, newLivre.url],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created Book: ", {
        title : newLivre.titre,
        author : newLivre.auteur,
        genre : newLivre.genre,
        parution_date : newLivre.date_parution,
        pages : newLivre.nb_pages,
        language : newLivre.langue,
        summary : newLivre.resume,
        image_src : newLivre.image_src,
        url : newLivre.url

      });
      result(null, { message: "Book added successfully" });
    }
  );
};

// methode pour récupérer tous les livres de la base de données
Livre.getAll = result => {
  sql.query("SELECT * FROM livre", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;

    }
    console.log("livres: ", res);
    result(null, res);
  });
}
module.exports = Livre;