const express = require("express");
const app = express();

const body_parser = require("body-parser");
const torrentRoute = require('./routes/torrent');
const mongoose = require('mongoose');
const Movie = require('./database/movie.schema');

const port = process.env.port || 3000;
const url = 'mongodb://localhost:27017/Hypertube';

mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log("Database connected")
    setInterval(() => {
        Movie.deleteMany({ expires: { $lt: Date.now() } }, function (err) {
            if (err)
                console.log({ mongoDeleteError: err });
        })
    }, 3600000 * 24); // 3600000 for 1 hour
}).catch(err => {
    console.error("Connecting to error =>" + err);
})

app.use(body_parser.json());

app.use('/', express.static('public'));

// app.use('/assets/', express.static('assets'));

app.use('/torrent/', torrentRoute);

app.listen(port, () => {
    console.log("Listening on port " + port + "...");
})