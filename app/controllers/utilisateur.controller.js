const Utilisateur = require("../models/utilisateur.model.js");
const sql = require("../models/db.js"); 
const bcrypt = require("bcrypt");
const emailController = require("./email.controller.js");
var jwt = require('jsonwebtoken'); // Importation de la librairie pour générer les jwt
const Email = require("../models/email.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  // Create a User
  const utilisateur = new Utilisateur({
    email_user: req.body.email_user,
    pseudo: req.body.pseudo,
    mdp: req.body.mdp,
  });

  // Save the user in the database
  Utilisateur.create(utilisateur, (err, data) => {
    if (err)
      if (err === "Email already exists") {
        return res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    else {
      res.json({
        message: "User added succesfully",
        email: utilisateur.email_user,
        pseudo: utilisateur.pseudo,
      });
    }
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  Utilisateur.login(req, (err, data) => {
    if (err)
      if (err === "Wrong password" || err === "Email not registered") {
        return res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    else {
      const token = jwt.sign({ email: req.body.email_user }, "mastercampmdp");
      res.json({ token: token });
    }
  });
};


exports.forgot_password = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  console.log(req.body.email);

  Utilisateur.exists(req, (err, result) => {
    if (err) {
      if (err === "User not registered") {
        res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    }
    else{

      console.log("User exists ! Sending mail...");

      const payload = {
        email: req.body.email,
      };
    
      const secretKey = 'mastercampmdp'; // secret key to encrypt the token
    
      const options = {
        expiresIn: '1 hour', // Set the token expiration time
      };
    
      const token = jwt.sign(payload, secretKey, options);
    
      const resetLink = `http://localhost:8081/reset-password?token=${token}`;

      const email = new Email({
        to: req.body.email,
        subject: "Reset Password Book Master",
        template: "email-reset-password",
        context: {
          link: resetLink
        },
        attachments: [{
          filename: "LogoJour.png",
          path: "LogoJour.png",
          cid: "image_cid"
        }]
      });
      
      sql.query("INSERT INTO reset_tokens (token, email_user) VALUES (?,?)", [token, req.body.email], (error,results)=>{
        if (error) {
          console.error("Error storing token in the database:", error);
          res.status(500).json({ message: "An error occurred while storing the token!" });
        } else {
          // Token stored successfully
          console.log("Token stored successfully in the database.");
          
          Email.send(email, (result) => {
            if (!result) {
              // Error occurred during sending the email
              console.error("Error sending email:", error);
              res.status(500).json({ message: "An error occurred while sending the email!" });
            } else {
              // Email sent successfully
              console.log("Email sent successfully:", result);
              res.status(200).json({ message: "Email was sent." });
            }
          });
        }
      });
      
    }
  });

};

  

exports.verif_token = (req,res) => {
  const token = req.query.token;
  console.log(token);
  const decoded = verifyResetToken(token);
  console.log("here");
  if (!decoded) {
    // Token verification failed, handle accordingly (e.g., show error page)
    console.log("failed");
    // return res.status(400).json({ error: 'Invalid or expired reset token' });
    const redirectLink = `https://localhost:8081/reset-password`;
    res.redirect(redirectLink);
  }
  // Token is valid, render the password reset page
  console.log(decoded);
  res.json({ email : decoded.email });
}

const verifyResetToken = (token) => {
  try {
    const secretKey = 'mastercampmdp';
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};


exports.extract_email = (req, res) => {
  const token = req.query.token;
  console.log(token);
  const decoded = verifyResetToken(token);
  console.log("here");
  if (!decoded) {
    // Token verification failed, handle accordingly (e.g., show error page)
    console.log("failed");
    return res.status(400).json({ error: 'Invalid or expired reset token' });
  }
  res.json({ email : decoded.email });
}


exports.reset_password = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  console.log(req.body.email);

  bcrypt.hash(req.body.mdp, 10, (err, hashedPassword) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      const hashedmdp = hashedPassword;
      sql.query("UPDATE utilisateur SET mdp = ? WHERE email_user = ?", [hashedmdp, req.body.email], (err, data)=> {
        if (err)
          if (err === "User not found") {
            return res.status(409).json({ message: err });
          } else {
            res.status(500).send({
              message: err.message || "Some error ",
            });
          }
        else {
          console.log("successful !")
          console.log(req.body.mdp);
          res.json({ message: "Password updated successfully" });
        }
      });
    }
  });
};