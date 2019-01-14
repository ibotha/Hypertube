const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');

//Routes const
const generalRoutes = require('./routes/general');
const userRoutes = require('./routes/users');
const googleRoute = require('./routes/gOauth');
const facebookRoute = require('./routes/fOauth');
const intraRoute = require('./routes/iOauth');
const twitterRoute = require('./routes/tOauth');
const passport = require('passport');

const url = 'mongodb://localhost:27017/Hypertube';

mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Database connected")
}).catch(err => {
  console.error("Connecting to error =>" + err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findOne({id : { ssoID: { $in: id } } }, (err, user) => {
    done(err, user);
  });
});

app.use(session({ secret: "American Pie: Beta House", saveUninitialized: false, resave: false }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
	  "Access-Control-Allow-Methods",
	  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});


//Use for standard routing, eg 404, index etc.
app.use("/", generalRoutes);

//Example use for users ->
app.use("/user/", userRoutes);
app.use("/auth/google/", googleRoute);
app.use("/auth/facebook/", facebookRoute);
app.use("/auth/42/", intraRoute);
app.use("/auth/twitter/", twitterRoute);

app.post('*', function(req, res, next) {
	//Technically a 404
	res.end(404);
})

app.get('*', function(req, res, next) {
	//Technically a 404
	res.end('{"Msg":"404"}');
});

module.exports = app;
