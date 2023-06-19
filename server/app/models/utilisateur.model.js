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


Utilisateur.createUser = async (lastname, firstname, mail, password) => {
  try {
    const create = await sql("clients").insert({
      lastname: lastname,
      firstname: firstname,
      password: password,
      mail: mail,
    });
    respObj = {
      status: "success",
      data: create,
    };
    return respObj;
  } catch (e) {
    respObj = {
      status: "failed",
      data: "User already exists",
    };
    return respObj;
  }
};

/*
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

      if (mdp !== utilisateur.mdp) {
        const errorMessage = "Wrong password";
        console.log(errorMessage);
        result(errorMessage, null);
        return;
      }

      result(null, utilisateur);
    }
  );
};
*/

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
    "select * from Admin where email_admin = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (rows.length === 0) {
        // User is not in admin table
        result(null, false);
        return;
      } else {
        // User is in admin table
        result(null, true);
        return;
      }
    })
}

module.exports = Utilisateur;