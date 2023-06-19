const Utilisateur = require("../models/utilisateur.model.js");
const db = require("../models/db.js");
const utilisateurRoutes = require("../routes/utilisateur.routes.js");

exports.create = (req, res) =>{
    // Validate request
    if(!req.body){
        res.status(400).send({
            message : "Content can not be empty !"
        });
    }

    // Create a User
    const utilisateur = new Utilisateur({
        email_user : req.body.email_user,
        pseudo : req.body.pseudo,
        mdp : req.body.mdp
    });

    // Save the user in the database
    Utilisateur.create(utilisateur, (err, data)=>{
        if(err)
          if(err === "Email already exists"){
            return res.status(409).json({message : err})
          }else{
            res.status(500).send({
                message : err.message || "Some error ",
            });
          }
        else {
            res.json({message:"User added succesfully", email : utilisateur.email_user, pseudo : utilisateur.pseudo});
        }
    })
}

exports.login = (req, res) => {
  if(!req.body){
    res.status(400).send({
        message : "Content can not be empty !"
    });
  }

  Utilisateur.login(req, (err, data)=>{
    if(err)
          if(err === "Wrong password" || err === "Email not registered"){
            return res.status(409).json({message : err})
          }
          else{
            res.status(500).send({
                message : err.message || "Some error ",
                test : utilisateur.email_user,
                pseudo : utilisateur.pseudo,
                mdp : utilisateur.mdp
            });
          }
        else {
            res.json({message:"Login successful"});
        }
  })
}

exports.createUser = async (req,res) => { {
        try{
          const create = await db('clients').insert({email_user:req.body.email_user, pseudo:req.body.pseudo, mdp: req.body.mdp});
          respObj = {
            status: "success",
            data: create
          }
          return respObj
        }catch(e){
          respObj = {
            status: "failed",
            data: "User already exists"
          }
          return respObj
        }  
      }
}

//'select count(*) as count from Admin where email_admin = ?'

exports.isAdmin = async (email) => {
  //Return is admin or not
  Admin.count({
    where: {
      email_admin: email
    }
  })
  
  .then(count => {
    if (count > 0) {
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
  })

  .catch(error => {
    console.error('Error checking admin status : ', error);
    throw error;
  });
};

