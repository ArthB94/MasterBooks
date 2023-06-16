/*var epubParser = require('epub-metadata-parser');
epubParser.parse('./carroll_alice_aux_pays_des_merveilles.epub', '../Documents' , book => {
    console.log(book);
});*/

/*
// Create a <script> element
var scriptElement = document.createElement('script');

// Set the 'src' attribute to the path of the EPUB.js library file
scriptElement.src = 'epub.js-master/epub.js';

// Append the <script> element to the document's <head> or <body>
document.head.appendChild(scriptElement);


// Wait for the EPUB.js library to load
scriptElement.onload = function() {
  // Use the EPUB object from the globally available 'ePub' variable
  var book = ePub("_OceanofPDF.com_The_Cousins_-_Karen_M_McManus.epub");

  book.ready.then(function() {
    var metadata = book.package.metadata;
    console.log("Title:", metadata.title);
    console.log("Author:", metadata.creator);
    console.log("Publisher:", metadata.publisher);
    console.log("Description:", metadata.description);
  }).catch(function(error) {
    console.error("Error loading book:", error);
  });
};*/
const { Book } = require("epubjs");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

// Load the EPUB file using jsdom
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
  runScripts: "outside-only",
});
const window = dom.window;
const document = window.document;

// Use the Book class from epubjs to create a book instance
const book = new Book("", {
  requestMethod: "node",
  request: (url) => {
    return fetch(url).then(response => response.text());
  },
});

book.open("_OceanofPDF.com_The_Cousins_-_Karen_M_McManus.epub");

book.ready.then(() => {
  const metadata = book.package.metadata;
  console.log("Title:", metadata.title);
  console.log("Author:", metadata.creator);
  console.log("Publisher:", metadata.publisher);
  console.log("Description:", metadata.description);
}).catch(error => {
  console.error("Error loading book:", error);
});



