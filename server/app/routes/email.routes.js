const express = require("express");
const path = require("path");

module.exports = app => {
    const email = require("../controllers/email.controller.js");

    var router = require("express").Router();

    router.post("/send", email.send);

    // app.use('/static', express.static(path.resolve(__dirname, '../config/emails/assets')));
    app.use('/api/email', router);
}