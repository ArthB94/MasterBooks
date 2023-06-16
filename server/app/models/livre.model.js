const sql = require("./db.js");



// constructeur et structure de l'objet Livre
const Livre = function (livre) {
  this.titre = livre.titre;
  this.auteur = livre.auteur;
  this.date_publication = livre.date_publication;
  this.genre = livre.genre;
  this.resume = livre.resume;
  this.url = livre.url;
  this.nb_pages = livre.nb_pages;
};


// methode pour créer un livre et l'ajouter à la base de données
Livre.create = (newLivre, result) => {
  sql.query(
    "INSERT INTO livre (reference, titre, auteur,email_user, pseudo, mdp) VALUES (?,?,?)",
    [newUtilisateur.email_user, newUtilisateur.pseudo, hashedmdp],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created utilisateur: ", {
        email: newUtilisateur.email_user,
        pseudo: newUtilisateur.pseudo,
      });
      result(null, { message: "User added successfully" });
    }
  );
};
