const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const LocalStrategy   = require('passport-local').Strategy;
const passport        = require('passport');
const _mongo          = require('mongodb');
const imagesave       = require('../functions/saveimage');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(email, password, done) {
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
      new User({
        firstName: firstname,
        lastName: lastname,
        ssoid: result._id
      }).save();
      res.status(201).json({message: "User added successfully"});
    }).catch(err => {
      res.status(201).json({message: "User added unsuccessfully " + err});
    })
});

router.get('/login',
  passport.authenticate('local', { failureRedirect: '/user/fail'}),
  function(req, res) {
    res.status(201).jsonp({"msg": "OK"})
});

router.get('/currUser', (req, res) => {
  if (req.session.passport)
  {
    var oID =  new _mongo.ObjectID(req.session.passport.user);
    User.findOne({_id: oID}).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      res.status(200).json({'Erorr':err})
    });
  }
})

router.get('/getCurr', (req, res) => {
  console.log(req.session.passport);
  res.status(200).json({
    id: req.session.passport
  })
});

router.get('/fail', (req, res) => {
  res.status(201).jsonp({"msg": "NOPE"});
})

router.get('/', passport.authenticate('local', { failureRedirect: '/user/fail'}));

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('http://localhost:8080');
})

router.post('/file/upload/profile', function(req, res) {
  imagesave.upload.single('profileImage')(req, res, err => {

  })
})

router.get('/user/verify', function(req, res) {
  let hash = bcrypt.hashSync('', 10);
	var fullUrl = req.protocol + '://' + req.get('host');
})

module.exports = router;
