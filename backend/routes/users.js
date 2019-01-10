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
  var email = req.body.email;
  var password = req.body.password;
  const user = new User({
    email: email
  });
  user.find().then(res => {
    let compare = bcrypt.compareSync(password, res['password']);
    if (compare)
    {
      console.log("Connected user");
    } else {
      console.log("Failed to aunthenticate");
    }
  }).catch(err => {
    console.log(err);
  })
});

module.exports = router;
