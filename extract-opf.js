const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');
const fsExtra = require('fs-extra');

const epubFileName = '_OceanofPDF.com_The_Song_of_Achilles_-_Madeline_Miller.epub';
const epubPath = path.join(__dirname, epubFileName);

const zip = new AdmZip(epubPath);

// Extract the OPF file
const opfEntry = zip.getEntries().find(entry => entry.entryName.endsWith('.opf'));
if (!opfEntry) {
  console.log('OPF file not found in the EPUB.');
  return;
}

const opfData = zip.readAsText(opfEntry);
console.log('OPF file extracted successfully!');

// Parse the OPF data
const parser = new xml2js.Parser();
parser.parseString(opfData, (parseErr, result) => {
  if (parseErr) {
    console.error('Error parsing OPF file:', parseErr);
    return;
  }

  // Extract the content of the <meta> element with name="cover"
  const metaElements = result.package.metadata[0].meta;
  let coverContent;

  for (const meta of metaElements) {
    if (meta.$.name === 'cover') {
      coverContent = meta.$.content;
      break;
    }
  }

  if (coverContent) {
    console.log('Cover content:', coverContent);

    // Find the href of the item with matching id
    const manifestElements = result.package.manifest[0].item;
    let coverHref;

    for (const item of manifestElements) {
      if (item.$.id === coverContent) {
        coverHref = item.$.href;
        break;
      }
    }

    if (coverHref) {
      console.log('Cover href:', coverHref);

      // Create the covers directory if it doesn't exist
      const coversDir = path.join(__dirname, 'covers');
      if (!fs.existsSync(coversDir)) {
        fs.mkdirSync(coversDir);
        console.log('Created covers directory.');
      }

      // Extract the cover image and save it to the covers directory
      const coverEntry = zip.getEntry(coverHref);
      if (coverEntry) {
        const coverFilePath = path.join(coversDir, path.basename(coverHref));
        zip.extractEntryTo(coverEntry, coverFilePath, false, true);
        console.log('Cover image extracted and saved successfully:', coverFilePath);

        // Delete the opf directory and its contents
        const opfDir = path.join(__dirname, 'opf');
        fsExtra.removeSync(opfDir);
        console.log('OPF directory deleted:', opfDir);
      } else {
        console.log('Cover item not found in EPUB.');
      }
    } else {
      console.log('Cover item not found in manifest.');
    }
  } else {
    console.log('Cover meta element not found.');
  }
});






























/*

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');

const epubFileName = 'packard_les_cranes_d_or.epub';
const epubPath = path.join(__dirname, epubFileName);

const zip = new AdmZip(epubPath);

// Extract the OPF file
const opfEntry = zip.getEntries().find(entry => entry.entryName.endsWith('.opf'));
if (!opfEntry) {
  console.log('OPF file not found in the EPUB.');
  return;
}

const opfFilePath = path.join(__dirname, epubFileName.replace('.epub', ''), opfEntry.entryName); // Generate the output file path for the OPF file
console.log(opfFilePath);

zip.extractEntryTo(opfEntry, opfFilePath, false, true);
console.log('OPF file extracted successfully!');

// Read and parse the OPF file
fs.readFile(opfFilePath, 'utf-8', (err, xmlData) => {
  if (err) {
    console.error('Error reading OPF file:', err);
    return;
  }

  const parser = new xml2js.Parser();
  parser.parseString(xmlData, (parseErr, result) => {
    if (parseErr) {
      console.error('Error parsing OPF file:', parseErr);
      return;
    }

    // Extract the content of the <meta> element with name="cover"
    const metaElements = result.package.metadata[0].meta;
    let coverContent;

    for (const meta of metaElements) {
      if (meta.$.name === 'cover') {
        coverContent = meta.$.content;
        break;
      }
    }

    if (coverContent) {
      console.log('Cover content:', coverContent);
    } else {
      console.log('Cover meta element not found.');
    }
  });
});*/
