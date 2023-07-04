module.exports = app =>{
    const genres = require("../controllers/genre.controller.js");

    var router = require("express").Router();

    router.post("/add", genres.create);

    router.get("/all", genres.findAll);

    app.use('/api/genre', router);

}