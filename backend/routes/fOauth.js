const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const FacebookStrategy  = require('passport-facebook').Strategy;
const passport        = require('passport');
const facebookcred    = require('../credentials/facebook-cred.json');

const FACEBOOK_APP_ID = facebookcred.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = facebookcred. FACEBOOK_APP_SECRET;

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ email: "Set Later", firstName: profile.name.givenName, lastName: profile.name.familyName, password: "setLater",  facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


router.get('/', passport.authenticate('facebook', { scope: ['profile'] }));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
})

module.exports = router;
