const express		= require('express');
const router		= express.Router();
const bcrypt    = require('bcrypt');
const User      = require('../database/user.schema');

router.post('/create', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
    let hash = bcrypt.hashSync(password, 10);
    const user = new User({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hash
    });
    user.save().then(() => {
      console.log("User Created");
      res.status(201).json({message: "Post added successfully"});
    }).catch(err => {
      console.log("Isard fault =? " + err);
      res.status(201).json({message: "Post added unsuccessfully"});
    })
});

router.get('/login', function(req, res, next) {
	res.end('{"msg":"OK"}');
});

module.exports = router;
