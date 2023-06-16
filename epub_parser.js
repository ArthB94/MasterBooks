var epubParser = require('epub-metadata-parser');
epubParser.parse('./_OceanofPDF.com_The_Cousins_-_Karen_M_McManus.epub', '../Documents' , book => {
    console.log(book);
});