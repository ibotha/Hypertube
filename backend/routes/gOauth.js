const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const ssoID           = require('../database/ssoid.schema');
const fs              = require('fs');
const GoogleStrategy  = require('passport-google-oauth20').Strategy;
const passport        = require('passport');
const googleCred      = require('../credentials/google-cred.json');

const GOOGLE_CLIENT_ID = googleCred.web.client_id
const GOOGLE_CLIENT_SECRET = googleCred.web.client_secret;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    ssoID.findOne( { ssoid: profile._json.id } ).then(res => {
      if (res) {
        return cb(null, res);
      } else {
        var u = new ssoID({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          ssoid: profile.id
        });
        u.save().then(res => {
          return cb(null, res);
        }).catch(err => {

        })
      }
    }).catch(err => {

    });
  }
));

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:8080/login' }), (req, res) => {
  res.redirect('http://localhost:8080/profile');
})

module.exports = router;
