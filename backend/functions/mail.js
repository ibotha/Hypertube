const mailer = require('nodemailer');
const settings = require('../credentials/mail.json');
"use strict";

var transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: settings.Username,
    pass: settings.Password
  }
});

function sendEMail(email, subject, message, html) {
  var mailOptions = {
    from: 'HyperestOfHypertubes@gmail.com',
    to: email + ", <" + email + ">",
    subject: subject,
    text: message,
    html: html
  }
  transport.sendMail(mailOptions).then(info => {
  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  sendMail: sendEMail
}
