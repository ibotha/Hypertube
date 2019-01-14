const express		= require('express');
const router		= express.Router();
const bcrypt    = require('bcrypt');
const User      = require('../database/user.schema');
const ssoID     = require('../database/ssoid.schema');

router.post('/create', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;
    let hash = bcrypt.hashSync(password, 10);
    const user = new User({
      email: email,
      password: hash
    });
    user.save().then((res) => {
      new ssoID({
        firstName: firstname,
        lastName: lastname,
        ssoID: { local: res._id }
      }).save();
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

router.get('/currUser', (req, res) => {
  res.status(200).json(req.session != null ? req.session : {});
})

router.get('/getCurr', (req, res) => {
  res.status(200).json(
    req.session.passport
  )
})

router.get('/', (req, res) => {
  if (req.session)
  {
    console.log(req.session);
  }
  res.end();
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('http://localhost:8080');
})

module.exports = router;
