const express		        = require('express');
const router		        = express.Router();
const User              = require('../database/user.schema');
const TwitterStrategy   = require('passport-twitter').Strategy;
const passport          = require('passport');
const TwitterCred       = require("../credentials/twitter-cred.json");

const TWITTER_CONSUMER_KEY = TwitterCred.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = TwitterCred.TWITTER_CONSUMER_SECRET;

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, cb) {
   User.findOne( { ssoid: { twitter: profile.id } } ).then(res => {
    if (res) {
      return cb(null, res);
    } else {
      var name = profile._json.name.split(' ');
      var u = new User({
        firstName: name[0],
        lastName: name[name.length - 1],
        ssoid: { twitter: profile.id }
      });
      u.save().then(res => {
        return cb(null, res);
      }).catch(err => {

      })
    }
  }).catch(err => {});
  }
));


router.get('/', passport.authenticate('twitter'));

router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: 'http://localhost:8080/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:8080/profile');
});

module.exports = router;
