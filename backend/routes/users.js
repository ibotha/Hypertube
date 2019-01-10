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
      res.status(201).json({message: "User added successfully"});
    }).catch(err => {
      res.status(201).json({message: "User added unsuccessfully " + err});
    })
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.find({email: email}, (err, doc) => {
    if (doc.length > 0)
    {
      let workingDoc = doc[0];
      if (workingDoc)
      {
        let hash = bcrypt.compareSync(password, workingDoc['password']);
        if (hash) {
          res.status(201).json({message: "Success"});
        } else {
          res.status(201).json({message: "Failure"});
        }
      }
    } else {
      res.status(201).json({message: "No Docs found"});
    }
  });
});

module.exports = router;
