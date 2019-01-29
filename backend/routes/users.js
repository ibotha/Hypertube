const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const LocalStrategy   = require('passport-local').Strategy;
const passport        = require('passport');
const _mongo          = require('mongodb');
const imagesave       = require('../functions/saveimage');
const verify          = require('../functions/verification');
const mail            = require('../functions/mail');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ username: username, verified: true }, function (err, user) {
      if (err) { return done(err); };
      if (!user) { return done(null, false); };
      let hash = bcrypt.compareSync(password, user['password']);
      if (!hash) { return done(null, false); };
      return done(null, user);
    });
  }
));

router.post('/create', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  let hash = bcrypt.hashSync(password, 10);
  let verification = bcrypt.hashSync(hash + Math.floor(Math.random() * 2048), 10);
    const user = new User({
      email: email,
      password: hash,
      verification_key: verification,
      firstName: firstname,
      lastName: lastname,
      username: username
    });
    user.save().then((result) => {
      var verifykey = req.protocol + "://" + req.get('host') + "/user/verify?username=" + username + "&email=" + email + "&verification=" + verification;
      var html = "<h1> Good day User </h1> <br><hr> <p>Verify Account please</p>" + "<a href='"+verifykey+"'><input type='button' value='verify'></a>";
      mail.sendMail(email, "Successful creation", "User Verification", html);
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
      res.status(200).json( { 'Erorr': err } )
    });
  }else
    res.status(200).json();
})

router.get('/getCurr', (req, res) => {
  res.status(200).json({
    id: req.session.passport
  })
});

router.get('/fail', (req, res) => {
  res.status(201).jsonp( { "msg": "NOPE" } );
})

router.get('/', passport.authenticate('local', { failureRedirect: '/user/fail'}));

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect(req.protocol + '://' + req.get('host').split(':')[0] + ':8080');
})

router.post('/file/upload/profile', function(req, res) {
  imagesave.upload.single('profileImage')(req, res, err => {

  })
})

router.get('/verify', function(req, res) {
    let mail = req.query.email;
    let verifyKey = req.query.verification;
    let username = req.query.username;
	  verify.verify(username, mail, verifyKey, cb => {
    res.redirect(req.protocol + "://" + req.get('host').split(":")[0] + ":8080/login?verifymsg=" + cb);
  });
})

module.exports = router;
