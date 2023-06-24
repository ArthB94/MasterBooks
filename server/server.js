const express = require("express");
const cors = require("cors");
const Utilisateur = require("./app/models/utilisateur.model.js");

const app = express();


// n'autorise que les requêtes provenant de http://localhost:8081
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

// permet de parser les requêtes de type application/json
app.use(express.json());

// permet de parser les requêtes de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/here", (req, res) => {
  res.json({ message: "here" });
});

// recuperer les données du formulaire et les afficher dans la console et dans la page
app.post('/test', (req,res)=>{
  const requestBody = req.body;
  console.log(requestBody)
  res.json({message: req.body.message})
})

//app.post("/create_utilisateur", (req,res)=>Utilisateur.create)


// 
require("./app/routes/utilisateur.routes.js")(app);
require("./app/routes/livre.routes.js")(app);
require("./app/routes/genre.routes.js")(app);
require("./app/routes/email.routes.js")(app);
require("./app/routes/shareToken.routes.js")(app);


// notre port d'écoute
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




app.post("/reset_password", (req,res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

console.log(req.body)

  let mailOptions = {
    from:  process.env.MAIL_USERNAME,
    to:  req.body.email,
    subject: 'Reset password MasterBooks',
    text: 'Please click on the link below to reset your password : \n129.151.226.75/fgpassword-page'
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });

})