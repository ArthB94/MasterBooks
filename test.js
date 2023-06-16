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
      let coverImagePath = epub.cover;
    if (!coverImagePath && metadata.cover) {
      // If the cover path is not available but specified in metadata, use it
      coverImagePath = metadata.cover;
    }

    console.log("Cover Image Path:", coverImagePath);
    });
    epub.parse();
  }

  const epubFilePath = "bazin_gingolph_l_abandonne.epub";
extractMetadata(epubFilePath);



  
