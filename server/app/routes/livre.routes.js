module.exports = app =>{
    const livres = require("../controllers/livre.controller.js");

    var router = require("express").Router();
    
    router.post("/add", livres.create);


    router.get("/all", livres.findAll);

    router.post("/share", livres.share);



    app.use('/api/livre', router);
}
