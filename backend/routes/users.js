const express		= require('express');
const router		= express.Router();
const bcrypt    = require('bcrypt');
const User      = require('../database/user.schema');
const ssoID     = require('../database/ssoid.schema');
const LocalStrategy = require('passport-local').Strategy;
const passport      = require('passport');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log("Is this even being caled?");
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      let hash = bcrypt.compareSync(password, user['password']);
      if (!hash) { return done(null, false); }
      return done(null, user);
    });
  }
));

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
    user.save().then((result) => {
      new ssoID({
        firstName: firstname,
        lastName: lastname,
        ssoID: { local: result._id }
      }).save();
      res.status(201).json({message: "User added successfully"});
    }).catch(err => {
      res.status(201).json({message: "User added unsuccessfully " + err});
    })
});

/*
router.post('/login', passport.authenticate('local', {failureRedirect:  'http://localhost:8080/fuck'}), function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.find({email: email}, (err, doc) => {
    if (doc.length > 0)
    {
      let workingDoc = doc[0];
      if (workingDoc)
      {
        let hash = bcrypt.compareSync(password, workingDoc['password']);
        req.session.passport = [];
        hash === true ? req.session.passport.user = workingDoc['_id'] : req.session.destroy(), req.logout();
        res.status(201).json({message: hash})
      }
    } else {
      res.status(201).json({message: "No Docs found"});
    }
  });
});
*/


router.post('/login',
  passport.authenticate('local',),
  function(req, res) {
    console.log("Is this even being caled?#2");
    res.status(200).jsonp({"msg":"OK"});
    //res.redirect('http://localhost:8080/profile');
});

router.get('/currUser', (req, res) => {
  res.status(200).json(req.session != null ? req.session : {});
})

router.get('/getCurr', (req, res) => {
  console.log(req.session.passport);
  res.status(200).json({
    id: req.session.passport
  })
})

router.get('/', passport.authenticate('local', { failureRedirect: "http://localhost:8080/login"}));

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('http://localhost:8080');
})

module.exports = router;
