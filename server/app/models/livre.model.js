const sql = require("./db.js");



// constructeur et structure de l'objet Livre
const Livre = function (livre) {
  this.titre = livre.titre;
  this.auteur = livre.auteur;
  this.genres = livre.genres;
  this.date_parution = livre.date_parution;
  this.nb_pages = livre.nb_pages;
  this.langue = livre.langue;
  this.resume = livre.resume;
  this.image_src = livre.image_src;
  this.url = livre.url;

};


// methode pour créer un livre et l'ajouter à la base de données
Livre.create = (newLivre, result) => {
  //insertion du nouveau livre dans la base de données
  console.log("newLivre", newLivre);
  sql.query(
    "INSERT INTO livre (titre, auteur, date_parution, pages, langue, resume, image_src, url) VALUES (?,?,?,?,?,?,?,?)",
    [newLivre.titre, newLivre.auteur, newLivre.date_parution, newLivre.nb_pages, newLivre.langue, newLivre.resume, newLivre.image_src, newLivre.url],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }else{
        //insertion des genres du nouveau livre dans la base de données
        newLivre.genres.forEach(genre => {
          //récupération de la référence du nouveau livre
          sql.query("SELECT reference FROM livre WHERE titre = ? and auteur = ? and date_parution = ? and pages = ? and langue = ? and image_src = ? and url = ? ", 
          [newLivre.titre, newLivre.auteur, newLivre.date_parution, newLivre.nb_pages, newLivre.langue, newLivre.image_src, newLivre.url], 
          (err, reference) => {
            if (err) {
              console.log("error reference :  ", err);
              result(err, null);
              return;
            } else {
              //récupération de l'id du genre
              sql.query("SELECT genre_id FROM genre WHERE genre = ?", [genre], (err, genre_id) => {
                if (err) {
                  console.log("error genre_id: ", err);
                  result(err, null);
                  return;
                } else {
                  //insertion de la référence du nouveau livre et de l'id du genre dans la table appartenir
                  sql.query(
                    "INSERT INTO appartenir (reference,genre_id) VALUES (?,?)",
                    [reference[0].reference, genre_id[0].genre_id],
                    (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                      }else{
                        console.log("created appartenir: ", {
                          reference : reference[0].reference,
                          genre_id : genre_id[0].genre_id
                        });
                      }
                    }
                  );
                }
              });


            }
          });
          
        });

        result(null, { message: "Book added successfully" });

      }
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