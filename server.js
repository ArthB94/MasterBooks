const express = require("express");
const cors = require("cors");
const Utilisateur = require("./app/models/utilisateur.model.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/here", (req, res) => {
  res.json({ message: "here" });
});

app.post('/test', (req,res)=>{
  const requestBody = req.body;
  console.log(requestBody)
  res.json({message: req.body.message})
})

//app.post("/create_utilisateur", (req,res)=>Utilisateur.create)

require("./app/routes/utilisateur.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});