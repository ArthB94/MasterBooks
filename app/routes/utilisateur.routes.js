module.exports = app =>{
    const utilisateurs = require("../controllers/utilisateur.controller.js");

    var router = require("express").Router();

    router.post("/register", utilisateurs.create);

    router.post("/arthur", utilisateurs.createUser);

    router.post('/login',utilisateurs.login);

    app.use('/api/auth', router);
}