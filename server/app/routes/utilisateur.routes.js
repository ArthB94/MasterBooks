module.exports = app =>{
    const utilisateurs = require("../controllers/utilisateur.controller.js");

    var router = require("express").Router();

    
    router.post("/register", utilisateurs.create);

    router.post('/login',utilisateurs.login);

    router.post('/forgot_password', utilisateurs.forgot_password);

    router.get('/verif_token', utilisateurs.verif_token);

    router.post('/reset_password', utilisateurs.reset_password);

    router.get('/extract_mail' , utilisateurs.extract_email);

    router.post('/change_password', utilisateurs.change_password);
    
    router.post('/isAdmin', utilisateurs.isAdmin);

    app.use('/api/auth', router);
}