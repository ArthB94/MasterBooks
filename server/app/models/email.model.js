const nodemailer = require('nodemailer');
const exphbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config({ path: __dirname + '/../config/emails/.env' });

const Email = function(email) {
    this.from = 'masterbookefrei@gmail.com';
    this.to = email.to;
    this.subject = email.subject;
    this.template = email.template;
    this.context = email.context;
    email.attachments.forEach(element => {
        element.path = path.resolve(__dirname, '../config/emails/assets/' + element.path)
    }); 
    this.attachments = email.attachments;
}

Email.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

Email.transporter.use(
    'compile',
    exphbs({
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve(__dirname, '../config/emails/templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, '../config/emails/templates'),
    })
);

Email.send = (email, result) => {
    Email.transporter.sendMail(email, (err, data) => {
        if (err) {
            console.log("Error " + err);
            result(false)
        } else {
            console.log("Email sent successfully.");
            result(true)
        }
    });
}

module.exports = Email;