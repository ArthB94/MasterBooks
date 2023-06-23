const EPUBJS = require("epubjs");
const fs = require("fs");
const https = require("https");
const domino = require("domino");

const epubFilePath = "packard_les_cranes_d_or.epub";

// Create a new DOM-like window object using domino
const window = domino.createWindow();
global.window = window;

console.log("start");

// Create a new EPUBJS Book instance with a custom request implementation
const customRequest = (url, options) => {
  // Use the `https` module to perform the HTTP request
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, response => {
      const chunks = [];
      response.on("data", chunk => chunks.push(chunk));
      response.on("end", () => {
        const data = Buffer.concat(chunks);
        resolve(data);
      });
    });
    console.log("hi")
    req.on("error", reject);
    req.end();
  });
};

console.log("bug above");
const book = new EPUBJS.Book(epubFilePath, { requestMethod: customRequest });
console.log(book);
book.opened.then(() => {
    console.log("Book opened successfully");
  
    // Handle the book's loaded event
    book.ready.then(() => {
      console.log("Book is ready");
      const coverUrl = book.coverUrl();
  
      // Retrieve the cover image as a Data URI
      book.archive.createUrl(coverUrl).then(dataUri => {
        // Extract the base64-encoded image data from the Data URI
        const imageData = dataUri.split(",")[1];
  
        // Save the cover image to a file
        fs.writeFileSync("covers/cover.jpg", imageData, "base64");
        console.log("Cover image saved successfully");
      });
    }).catch(error => {
      console.error("Error loading EPUB file:", error);
    });
  }).catch(error => {
    console.error("Error opening EPUB file:", error);
  });
  
  console.log("bug above");

