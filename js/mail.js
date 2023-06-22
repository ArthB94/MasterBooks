/*

http://www.trucsweb.com/tutoriels/javascript/tw303/#:~:text=Pour%20r%C3%A9cup%C3%A9rer%20les%20donn%C3%A9es%20ou,%3Dvaleur%26prenom%3Dvaleur%26email%3Dvaleur.


npm run serve pour run le code 

Page "Request a book" : ==> EntryForm.vue
Page "Contact Support" : ==> HelpPage.vue

Commencer par la page  "Request a book"

dans la page web, remplacer : <form action="#" method="post">
par <form action="admin/mail" method="post">
*/

/*EXEMPLE 1

Example avec le URL page.htm?cle1=Québec&cle2=Montréal
*/

// fonction pour récuperer les données dans l'url et les mettre sous la forme :
/*function takeValues() {
  // Éliminer le "?" grâce à search.substring(1)
  // où search récupère ? et tout ce qui suit et substring(1) supprime le ?
  var sReq = window.location.search.substring(1);
  // Matrice de la requête
  var aReq = sReq.split("&");
    /*
    aReq[0] = " txtEmail=nomLivre "
    aReq[1] = " txtEmail=AuteurLivre "
    aReq[2] = " txtEmail=editionLivre "
    */
   // récuperer les noms des cles
/*  MaVariable = nReq[i].substring(0, nReq[i].indexOf("="))
  // récuperer les valeurs 
  MaValeur = nReq[i].substring(param[i].indexOf("=")+1, nReq[i].length)
     
    
}*/


// Pour la page request a book



// Obtention des références aux éléments du formulaire
/*const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêche la soumission normale du formulaire

  // Récupération des valeurs des champs du formulaire
  const title = document.querySelector('input[name="txtTitle"]').value;
  const author = document.querySelector('input[name="txtAuthor"]').value;
  const edition = document.querySelector('input[name="txtEdition"]').value;

  // Création du contenu HTML à afficher dans la page admin.html
  const htmlContent = `
    <h1>Form Data:</h1>
    <p><strong>Title:</strong> ${title}</p>
    <p><strong>Author:</strong> ${author}</p>
    <p><strong>Edition:</strong> ${edition}</p>
  `;

  // Création d'un élément div pour afficher le contenu
  const div = document.createElement('div');
  div.innerHTML = htmlContent;

  // Ajout du contenu à la page actuelle
  document.body.appendChild(div);
});*/


// Obtention des références au formulaire
const form = document.getElementById('myForm');

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Empêche la soumission normale du formulaire

  // Récupération des valeurs des champs du formulaire
  const title = document.querySelector('input[name="txtTitle"]').value;
  const author = document.querySelector('input[name="txtAuthor"]').value;
  const edition = document.querySelector('input[name="txtEdition"]').value;

  // Création d'une URL avec les données du formulaire
  const url = `admin.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&edition=${encodeURIComponent(edition)}`;

  // Redirection vers la page admin.html
  window.location.href = url;
});


