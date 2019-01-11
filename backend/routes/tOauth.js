const express		      = require('express');
const router		      = express.Router();
const bcrypt          = require('bcrypt');
const User            = require('../database/user.schema');
const TwitterStrategy  = require('passport-twitter').Strategy;
const passport        = require('passport');
const TwitterCred     = require("../credentials/twitter-cred.json");

const TWITTER_CONSUMER_KEY = TwitterCred.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = TwitterCred.TWITTER_CONSUMER_SECRET;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


router.get('/', passport.authenticate('twitter'));

router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;
