const sql = require("./db.js");
const bcrypt = require("bcrypt");

// constructor
const Utilisateur = function (utilisateur) {
  this.email_user = utilisateur.email_user;
  this.pseudo = utilisateur.pseudo;
  this.mdp = utilisateur.mdp;
};


Utilisateur.create = (newUtilisateur, result) => {
  sql.query(
    "SELECT * FROM utilisateur WHERE email_user = ?",
    [newUtilisateur.email_user],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (rows.length > 0) {
        const errorMessage = "Email already exists";
        console.log(errorMessage);
        result(errorMessage, null);
        return;
      }

      bcrypt.hash(newUtilisateur.mdp, 10, (err, hashedPassword) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else {
          const hashedmdp = hashedPassword;

          sql.query(
            "INSERT INTO utilisateur (email_user, pseudo, mdp) VALUES (?,?,?)",
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
        }
      });
    }
  );
};


Utilisateur.login = (req, result) => {
  const email = req.body.email_user;
  const mdp = req.body.mdp;

  sql.query(
    "SELECT * FROM utilisateur WHERE email_user = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (rows.length === 0) {
        const errorMessage = "Email not registered";
        console.log(errorMessage);
        result(errorMessage, null);
        return;
      }

      const utilisateur = rows[0];

      bcrypt.compare(mdp, utilisateur.mdp, (err, isMatch) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (isMatch) {
          result(null, utilisateur);
        } else {
          const errorMessage = "Wrong password";
          console.log(errorMessage);
          result(errorMessage, null);
        }
      });
    }
  );
};

Utilisateur.isAdmin = (req, result) => {
  const email = req.body.email_user;
  sql.query(
    "select admin from utilisateur where email_user = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else {
        console.log("rows",rows[0].admin);
        if (rows[0].admin === 0) {
          console.log("not admin",rows[0].admin);
          result(null, false);
        }
        else  if (rows[0].admin === 1){
          console.log("admin",rows[0].admin);
          result(null, true);
        }
        else {
          console.log("error database admin: ", err);
          result(err, null);
          return;
        }
      }
    })


  // sql.query(
  //   "select * from Admin where email_admin = ?",
  //   [email],
  //   (err, rows) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(err, null);
  //       return;
  //     }

  //     if (rows.length === 0) {
  //       // User is not in admin table
  //       result(null, false);
  //       return;
  //     } else {
  //       // User is in admin table
  //       result(null, true);
  //       return;
  //     }
  //   })
}

Utilisateur.get = (userInfo, result) => {
  sql.query("SELECT * FROM utilisateur WHERE email_user = ?", [userInfo.email_user], (err, rows) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      if (rows.length === 0) {
        result(null, null);
      } else {
        const user = rows[0];
        result(null, {email_user: user.email_user, pseudo: user.pseudo});
      }
    }
  });
}

module.exports = Utilisateur;