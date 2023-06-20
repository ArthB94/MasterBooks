module.exports = app =>{
    const shareToken = require("../models/shareToken.model.js");

    var router = require("express").Router();

    
    router.get("/getLimit", shareToken.getLimit);

    router.get("/checkIfPossible", shareToken.getCheckIfPossible);
    
    app.use('/api/shareToken', router);
}