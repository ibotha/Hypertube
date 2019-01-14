const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const ssoID            = require('../database/ssoid.schema');
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
  /*ssoID.findOrCreate( { ssoID: { 42: profile._json.id} }, function (err, user) {
    return cb(err, user);
  });*/
  ssoID.findOne( { ssoID: { 42: profile._json.id } } ).then(res => {
    if (res) {
      return cb(null, res);
    } else {

    }
  }).catch(err => {

  });

}
));


router.get('/', passport.authenticate('42'));

router.get('/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;
