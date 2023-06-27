const Email = require("../models/email.model.js");

exports.send = (req, res) => {
    console.log("in");
    console.log(req.body);

    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const email = new Email({
        to: req.body.to,
        subject: req.body.subject,
        template: req.body.template,
        context: req.body.context,
        attachments: req.body.attachments
    });

    Email.send(email, (result) => {
        if (!result) {
            res.status(500).json({ message: "An error occured while sending the email!" });
            return;
        } else {
            return (null, { message: "Email was sent." });
        }
    });
}
