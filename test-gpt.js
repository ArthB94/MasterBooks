const EPub = require("epub");

function extractMetadata(epubFilePath) {
  const epub = new EPub(epubFilePath);

  epub.on("end", () => {
    const metadata = epub.metadata;
    console.log("Title:", metadata.title);
    console.log("Author(s):", metadata.creator);
    console.log("Description:", metadata.description);
    console.log("Publisher:", metadata.publisher);
    console.log("Publication Date:", metadata.date);

    const opfFilePath = epub.spine.contents[0].id;
    epub.getFile(opfFilePath, (err, opfData) => {
      if (err) {
        console.error("Error retrieving OPF file:", err);
        return;
      }

      const opfXml = opfData.toString();
      const metaElements = extractMetaElements(opfXml);

      if (metaElements.length > 0) {
        console.log("Additional Meta Elements:");
        metaElements.forEach(meta => {
          const name = meta.name;
          const content = meta.content;
          console.log(`${name}: ${content}`);
        });
      } else {
        console.log("No additional meta elements found in the OPF file.");
      }
    });
  });

  epub.parse();
}

function extractMetaElements(opfXml) {
  const metaElements = [];
  const regex = /<meta\s+([^>]+)>/g;

  let match;
  while ((match = regex.exec(opfXml))) {
    const metaElementString = match[0];
    const attributes = parseAttributes(metaElementString);
    if (attributes.name === "cover") {
      metaElements.push(attributes);
    }
  }

  return metaElements;
}

function parseAttributes(metaElementString) {
  const attributes = {};
  const attributeRegex = /(\S+)\s*=\s*"([^"]+)"/g;

  let match;
  while ((match = attributeRegex.exec(metaElementString))) {
    const attributeName = match[1];
    const attributeValue = match[2];
    attributes[attributeName] = attributeValue;
  }

  return attributes;
}

extractMetadata("_OceanofPDF.com_The_Song_of_Achilles_-_Madeline_Miller.epub");
