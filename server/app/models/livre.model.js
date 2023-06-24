const sql = require("./db.js");



// constructeur et structure de l'objet Livre
const Livre = function (livre) {
  this.titre = livre.titre;
  this.auteur = livre.auteur;
  this.genres = livre.genres;
  this.date_parution = livre.date_parution;
  this.pages = livre.pages;
  this.langue = livre.langue;
  this.resume = livre.resume;
  this.image_src = livre.image_src;
  this.url = livre.url;

};


// methode pour créer un livre et l'ajouter à la base de données
Livre.create = (newLivre, result) => {
  sql.query(
    "SELECT * FROM livre WHERE titre = ? AND auteur = ? AND pages = ? AND resume = ? AND url = ? AND date_parution = ? AND image_src = ? AND langue = ?",
    [
      newLivre.titre,
      newLivre.auteur,
      newLivre.pages,
      newLivre.resume,
      newLivre.url,
      newLivre.date_parution,
      newLivre.image_src,
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
          langue: newLivre.langue,
        });
        result({ message: "Book already exists" }, null);
        return;
      }

      // No book with the same information found, proceed with insertion
      sql.query(
        "INSERT INTO livre (titre, auteur, pages, resume, url, date_parution, image_src, langue) VALUES (?,?,?,?,?,?,?,?)",
        [
          newLivre.titre,
          newLivre.auteur,
          newLivre.pages,
          newLivre.resume,
          newLivre.url,
          newLivre.date_parution,
          newLivre.image_src,
          newLivre.langue,
        ],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          sql.query(
            "SELECT reference FROM livre WHERE titre = ? AND auteur = ? AND pages = ? AND resume = ? AND url = ? AND date_parution = ? AND image_src = ? AND langue = ?",
            [
              newLivre.titre,
              newLivre.auteur,
              newLivre.pages,
              newLivre.resume,
              newLivre.url,
              newLivre.date_parution,
              newLivre.image_src,
              newLivre.langue,
            ],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
        
              if(res.length > 0){
                const reference = res[0].reference;
                console.log(newLivre.genres);
                const genres = newLivre.genres.filter(element => element !== null);
                console.log(genres);
                for(let i = 0; i < genres.length; i++){
                  genre = genres[i];
                  sql.query("INSERT INTO appartenir (reference,genre_id) VALUES (?,?)",[reference,genre],(err,res)=>{
                    if (err) {
                      console.log("error: ", err);
                      result(err, null);
                      return;
                    }
                    else{
                      console.log("Genres entered in the database.");
                      console.log("Added book: ", {
                        titre: newLivre.titre,
                        auteur: newLivre.auteur,
                        pages: newLivre.pages,
                        resume: newLivre.resume,
                        url: newLivre.url,
                        date_parution: newLivre.date_parution,
                        image_src: newLivre.image_src,
                        genres: newLivre.genres,
                        langue: newLivre.langue,
                      });
                    }
                  })
                }
                result(null, { message: "Book added successfully" });
              }
            }
          )
        }
      );
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
    result(null, res);
  });
}

//methode pour récupérer les livres par filtre
Livre.getByFilter = (filterQuerry, result) => {
  console.log("filterQuerry", filterQuerry);
  sql.query(filterQuerry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
}



module.exports = Livre;