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

const url = 'mongodb://localhost:27017/Hypertube';

mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Database connected")
}).catch(err => {
  console.error("Connecting to error =>" + err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use("/google/", googleRoute);
app.use("/facebook/", facebookRoute);
app.use("/intra/", intraRoute);
app.use("/twitter/", twitterRoute);

app.post('*', function(req, res, next) {
	//Technically a 404
	res.end(404);
})

app.get('*', function(req, res, next) {
	//Technically a 404
	res.end('{"Msg":"404"}');
});


module.exports = app;
