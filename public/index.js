// http://localhost:3000/RequestABook.html
// http://localhost:3000/ContactSupport.html

// npm install nodemailer-express-handlebars

const express = require('express');
const nodemailer = require('nodemailer');
const exphbs = require('nodemailer-express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
require('dotenv').config();

// Servir les fichiers statiques depuis le répertoire "public"
app.use(express.static(path.join(__dirname, './')));

// Servir la page RequestABook.html
/*app.get('/RequestABook.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'RequestABook.html'));
});*/

// Middleware pour analyser les données POST
app.use(bodyParser.urlencoded({ extended: true }));


/*
path.join(__dirname, './') est utilisé pour créer le chemin absolu 
du répertoire actuel en utilisant la variable __dirname. 
Cela garantit que le serveur Express servira les fichiers statiques 
à partir du répertoire dans lequel index.js est exécuté.

./ ==> répertoire actuel 

*/
app.listen(port, () => {
  console.log(`nodemailerProject and server are listening at http://localhost:${port}`);
});

// c'est à dire http://localhost:3000

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.use(
  'compile',
  exphbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve(__dirname, 'views'),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, 'views'),
  })
);


var corps;

// Gérer la soumission du formulaire de RequestABook.html
// ici on a la route pour le formulaire RequestABook.html
app.post('/RequestABook.html', (req, res) => {
  const title = req.body.txtTitle;
  const author = req.body.txtAuthor;
  const langue = req.body.txtLangue;

  // Vérifier si les champs du formulaire sont remplis
  if (title && author && langue) {
    corps = "title : " + title + ", author : " + author + ", langue : " + langue;

    console.log('Titre :', title);
    console.log('Auteur :', author);
    console.log('Langue :', langue);
    console.log('Corps (du mail):', corps);


    let mailOptions = {
      from: 'masterbookefrei@gmail.com',
      to: 'masterbookefrei@gmail.com',
      subject: 'Book Addition request',
      template: 'email-body',
      context: {
        title: title,
        author: author,
        langue: langue,
      },
      attachments: [
        {
          filename: 'LogoJour.png',
          path: 'LogoJour.png',
          cid: 'image_cid', // Identifiant unique de l'image pour le .handlebars
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    res.redirect('/RequestABook.html')
  } else {
    res.send('Veuillez remplir tous les champs du formulaire');
  }
});


////////////////////////////////////// Gérer la soumission du formulaire de support
// req : request et res : response
app.post('/ContactSupport.html', (req, res) => {
  
  const name = req.body.txtName;
  const email = req.body.email;
  const summary = req.body.txtSummary;
  const details = req.body.txtDetails;
  const link = req.body.txtLink;
  //const file = req.files['file-upload']; // installer et config le middleware Multer pour gérer les fichiers

  // Vérifier si les champs du formulaire sont remplis
  if (name && email && summary && details) {
    // Faire ce que tu souhaites avec les valeurs récupérées
    console.log('Nom :', name);
    console.log('Email :', email);
    console.log('Résumé :', summary);
    console.log('Détails :', details);
    console.log('Lien :', link);
    //console.log('file :', file);

    let mailOptions = {
      from: 'masterbookefrei@gmail.com',
      to: 'masterbookefrei@gmail.com',
      subject: 'Demande de support',
      template: 'email-body-support',
      context: {
        name: name,
        email: email,
        summary: summary,
        details: details,
        link: link,
      },
      attachments: [
        {
          filename: 'LogoJour.png',
          path: 'LogoJour.png',
          cid: 'image_cid',
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Erreur " + err);
      } else {
        console.log("Email envoyé avec succès");
      }
    });
    res.redirect('/ContactSupport.html')
  } else {
    res.send('Veuillez remplir tous les champs du formulaire de support');
  }
});







/*
app.get('/contact-support', (req, res) => {
  res.sendFile(path.join(__dirname, 'ContactSupport.html'));
});

app.post('/contact-support', (req, res) => {
  const name = req.body.txtName;
  const email = req.body.email;
  const summary = req.body.txtSummary;
  const details = req.body.txtDetails;
  const link = req.body.txtLink;

  // Vérifier si les champs du formulaire sont remplis
  if (name && email && summary && details) {
    // Faire ce que tu souhaites avec les valeurs récupérées
    console.log('Nom :', name);
    console.log('Email :', email);
    console.log('Résumé :', summary);
    console.log('Détails :', details);
    console.log('Lien :', link);

    res.send('Formulaire de support soumis avec succès');

    let mailOptions = {
      from: 'masterbookefrei@gmail.com',
      to: 'masterbookefrei@gmail.com',
      subject: 'Demande de support',
      template: 'email-body-support',
      context: {
        name: name,
        email: email,
        summary: summary,
        details: details,
        link: link,
      },
      attachments: [
        {
          filename: 'LogoJour.png',
          path: 'LogoJour.png',
          cid: 'image_cid',
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Erreur " + err);
      } else {
        console.log("Email envoyé avec succès");
      }
    });
  } else {
    res.send('Veuillez remplir tous les champs du formulaire de support');
  }
});*/
















































































































///////////////////////////////TOUT CA C'EST BON ////////////////////////////////////
// http://localhost:3000/RequestABook.html

// npm install nodemailer-express-handlebars
/*
const express = require('express');
const nodemailer = require('nodemailer');
const exphbs = require('nodemailer-express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
require('dotenv').config();

// Middleware pour analyser les données POST
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le répertoire "public"
app.use(express.static(path.join(__dirname, './')));
/*
path.join(__dirname, './') est utilisé pour créer le chemin absolu 
du répertoire actuel en utilisant la variable __dirname. 
Cela garantit que le serveur Express servira les fichiers statiques 
à partir du répertoire dans lequel index.js est exécuté.

./ ==> répertoire actuel 

*/
/*
app.listen(port, () => {
  console.log(`nodemailerProject and server are listening at http://localhost:${port}`);
});

// c'est à dire http://localhost:3000

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.use(
  'compile',
  exphbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve(__dirname, 'views'),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, 'views'),
  })
);

var corps;

// Gérer la soumission du formulaire
app.post('/', (req, res) => {

  ////// PAGE REQUEST A BOOK 
  const title = req.body.txtTitle;
  const author = req.body.txtAuthor;
  const langue = req.body.txtLangue;

  // Vérifier si les champs du formulaire sont remplis
  if (title && author && langue) {
    corps = "title : " + title + ", author : " + author + ", langue : " + langue;

    // Faire ce que vous souhaitez avec les valeurs récupérées
    console.log('Titre :', title);
    console.log('Auteur :', author);
    console.log('Langue :', langue);
    console.log('Corps (du mail):', corps);

    res.send('Formulaire soumis avec succès');

    let mailOptions = {
      from: 'masterbookefrei@gmail.com',
      to: 'masterbookefrei@gmail.com',
      subject: 'Book Addition request',
      template: 'email-body',
      context: {
        title: title,
        author: author,
        langue: langue,
      },
      attachments: [
        {
          filename: 'LogoJour.png',
          path: 'LogoJour.png',
          cid: 'image_cid', // Identifiant unique de l'image pour le .handlebars
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } else {
    res.send('Veuillez remplir tous les champs du formulaire');
  }

  

});

*/