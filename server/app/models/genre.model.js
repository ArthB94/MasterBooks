const sql = require("./db.js");
const Genre = function (genre) {
    this.genre_id = genre.genre_id;
    this.genre = genre.genre;
  };
  
Genre.create = (newGenre, result) => {
    //insertion du nouveau livre dans la base de données
    sql.query(
        "INSERT INTO genre (genre) VALUES (?);" [newGenre.genre],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("create genre: ", {
          genre : newGenre.genre,
        });
        result(null, { message: "Genre added successfully" });
      }
    );
}

Genre.getAll = result => {
    sql.query("SELECT * FROM genre", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        console.log("genres: ", res);
        result(null, res);
    });
};



module.exports = Genre;