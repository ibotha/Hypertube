const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const generalRoutes = require('./routes/general');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret: "American Pie: Beta House", saveUninitialized: false, resave: false}));

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
//app.use('/user/', userRoutes);

module.exports = app;