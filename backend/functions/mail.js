const mailer = require('nodemailer');
const settings = require('../credentials/mail.json');
"use strict";

var transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: settings.username,
    pass: settings.password
  }
});

function sendMail(email, subject, message) {
  var mailOptions = {
    from: 'HyperestOfHypertubes@gmail.com',
    to: email + ", <" + email + ">",
    subject: subject,
    text: message
  }
  mailer.sendMail(mailOptions).then(info => {

  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  sendMail: sendMail
}
