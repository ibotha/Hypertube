const express		      = require('express');
const router		      = express.Router();
const User            = require('../database/user.schema');
const FortyTwoStrategy  = require('passport-42').Strategy;
const passport        = require('passport');
const FortyTwoCred    = require('../credentials/intra-cred.json');

const FORTYTWO_APP_ID = FortyTwoCred.FORTYTWO_APP_ID;
const FORTYTWO_APP_SECRET = FortyTwoCred.FORTYTWO_APP_SECRET;

passport.use(new FortyTwoStrategy({
  clientID: FORTYTWO_APP_ID,
  clientSecret: FORTYTWO_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/42/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne( { ssoid: { intra: profile._json.id.toString() } } ).then(res => {
    if (res) {
      console.log("Hello???");
      return cb(null, res);
    } else {
      var u = new User({
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        ssoid: { intra: profile._json.id.toString() },
        username: profile._json.login + " " + profile._json.pool_month + " " + profile._json.pool_year,
        email: profile._json.email
      });
      u.save().then(res => {
        return cb(null, res);
      }).catch(err => {
        console.log("Hello #2 " + err);
      })
    }
  }).catch(err => {
    console.log("Hello #3");
  });
}
));


router.get('/', passport.authenticate('42', { failureRedirect: 'http://localhost:8080/login'}));

router.get('/callback',
  passport.authenticate('42', { failureRedirect: 'http://localhost:8080/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:8080/profile');
});

module.exports = router;
