module.exports = app =>{
    const utilisateurs = require("../controllers/utilisateur.controller.js");

    var router = require("express").Router();

    
    router.post("/register", utilisateurs.create);

    router.post("/arthur", utilisateurs.createUser);

    router.post('/login',utilisateurs.login);
    
    router.post('/isAdmin', utilisateurs.isAdmin);

    app.use('/api/auth', router);
}