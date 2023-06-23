
var epubParser = require('epub-metadata-parser');
epubParser.parse('./packard_les_cranes_d_or.epub', './Documents' , function(book) {
    console.log(book);
});
