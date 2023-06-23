const EPub = require("epub");

function extractMetadata(epubFilePath) {
  const epub = new EPub(epubFilePath);

  epub.on("end", () => {
    const metadata = epub.metadata;
    console.log(epub.metadata);
    console.log("Title:", metadata.title);
    console.log("Author(s):", metadata.creator);
    console.log("Description:", metadata.description);
    console.log("Publisher:", metadata.publisher);
    console.log("Publication Date:", metadata.date);

    /*
    const coverId = metadata.cover;
    if (coverId) {
      const coverItem = epub.flow.find(item => item.id === coverId);
      if (coverItem) {
        const coverImagePath = coverItem.href;
        console.log("Cover Image Path:", coverImagePath);
      }
    } else {
      console.log("No cover image specified in the EPUB metadata.");
    }*/
  });
  epub.coverUrl().then(function(url) {
    // The URL of the cover image is available here
    console.log("Cover URL:", url);
  }).catch(function(error) {
    // Handle any errors that occur
    console.error("Error retrieving cover URL:", error);
  });
  epub.parse();
  
}

const epubFilePath =
  "_OceanofPDF.com_The_Song_of_Achilles_-_Madeline_Miller.epub";
extractMetadata(epubFilePath);
