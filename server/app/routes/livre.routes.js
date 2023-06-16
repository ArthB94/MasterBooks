module.exports = app =>{
    const livres = require("../controllers/livre.controller.js");

    var router = require("express").Router();
    
    router.post("/add", livres.create);

    router.post("/delete", livres.delete);

    app.use('/api/livre', router);
}
