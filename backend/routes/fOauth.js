const express		        = require('express');
const router		        = express.Router();
const User              = require('../database/user.schema');
const FacebookStrategy  = require('passport-facebook').Strategy;
const passport          = require('passport');
const facebookcred      = require('../credentials/facebook-cred.json');

const FACEBOOK_APP_ID = facebookcred.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = facebookcred. FACEBOOK_APP_SECRET;

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOne( { ssoid: { facebook: profile.id } } ).then(res => {
      if (res) {
        return cb(null, res);
      } else {
        var name = profile.displayName.split(' ');
        var u = new User({
          firstName: name[0],
          lastName: name[name.length - 1],
          ssoid: { facebook: profile.id }
        });
        u.save().then(res => {
          return cb(null, res);
        }).catch(err => {

        })
      }
    }).catch(err => {});
  }
));


router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:8080/login' }), (req, res) => {
  res.redirect('http://localhost:8080/profile');
})

module.exports = router;
