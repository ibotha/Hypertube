// EXPRESS
const express       = require('express');
const router        = express.Router();
// DB
const mongoose      = require('mongoose');
const Movie         = require('../database/movie.schema');
// WEBTORRENT
const WebTorrent    = require('webtorrent');
const client        = new WebTorrent();
// FILE 
const fs            = require('fs');
const rimraf        = require('rimraf');
// ADDITIONAL
const progress      = require('cli-progress');

// REQUEST TO TORRENT FILE
router.post('/download/', (req, res) => {
    
    // PROCESS REQUEST ( INFO HASH / MAGNET LINK / LINK TO TORRENT FILE )
    var torrentLink = req.body.torrentLink;

    var torrentID = mongoose.Types.ObjectId();

    // INITIALISE PROGRESS BAR
    const completedBar = new progress.Bar({}, progress.Presets.shades_classic);

    // ADD TORRENT TO CLIENT -- START TORRENTING
    var torrent = client.add(torrentLink, {path: './assets/' + torrentID + '/'});

    // RES CONTROL
    var resSend = false;

    torrent.on('ready', function () {

        // GET MOVIE FILE
        var movieFile = torrent.files[0];
        torrent.files.forEach(element => {
            if (element.length > movieFile.length)
                movieFile = element;
        });

        // MOVIE DURATION FOR READY CALCULATION (CURRENTLY SET TO 0.35 TO TEST 14 MIN VIDEO -- DEFAULT IS 2 HOURS)
        var movieDuration = 0.35 /* hours */ * 60 * 60;
        if (req.body && req.body.lengthInSeconds)
            movieDuration = req.body.lengthInSeconds;
        if (req.body && req.body.lenghtInMinutes)
            movieDuration = req.body.lengthInMinutes * 60;

        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); 

        // SAVE INFO TO DB
        const movieMeta = {
            movieID: torrentID,
            infoHash: torrent.infoHash,
            moviePath: movieFile.path,
            status: "STARTED",
            expires: expiryDate.getTime(),
            subtitles: [],
            movieStats: {
                length: movieFile.length,
                type: movieFile.name.match('\.[^.\\/:*?"<>|\r\n]+$')[0].substr(1),
                duration: movieDuration
            }
        };
        const movie = new Movie(movieMeta);
        movie.save( function (err, movie){
            if (err){
                // MOVIE ALREADY DOWNLOADED
                client.remove(torrentLink);
                rimraf('./assets/' + torrentID, function (err) {
                    if (err)
                        console.log(err);
                });
                Movie.findOne({ infoHash: movieMeta.infoHash}, function (err, movie){
                    if (resSend == false) {
                        res.send(movie);
                        resSend = true;
                    }
                })
            }else{
                // NEW MOVIE WILL BEGIN DOWLOADING
                if (resSend == false) {
                    res.send(movieMeta);
                    resSend = true;
                }
            }
        });
        

        // PRIORITIZE BEGIN/END OF MOVIE FILE (FOR METADATA)
        torrent.critical(movieFile._startPiece, movieFile._startPiece + 1);
        torrent.critical(movieFile._endPiece - 1, movieFile._endPiece);

        // GET TOTAL NUMBER OF PIECES
        var total = torrent.pieces.length;

        // SET PROGRESS BAR BASED ON TOTAL NUMBER OF PIECES
        completedBar.start(total, 0);

        // SET TORRENT PRIORITY -- FOCUS FIRST TO LAST
        for (let index = 0; index < total; index++) {
            torrent.select(index, index, total - index, function (){
                completedBar.update(index);
                torrent.deselect(index, index);
            })
        }        

        // ONLY UPDATE READY STATE ONCE
        var readySet = false;

        var watchSpeed = movieFile.length / movieMeta.movieStats.duration;
        var downloadSpeed = 0 + torrent.downloadSpeed;
        
        // CALCULATE WHETHER IT IS READY TO STREAM OR NOT
        torrent.on('download', function (bytes) {
            
            // ACCUMULATIVE DOWNLOAD SPEED
            downloadSpeed = (downloadSpeed + torrent.downloadSpeed) / 2;

            var progress = movieFile._startPiece;
            while (progress <= movieFile._endPiece && torrent.pieces[progress] == null)
                progress++;
            progress = progress / total;

            if (readySet == false && progress > 0.15) {

                // IF WATCH FASTER THAN DOWNLOAD OR DOWNLOADED > NEEDED
                if (watchSpeed < downloadSpeed || movieFile.downloaded > (1 - (watchSpeed / downloadSpeed )) * movieFile.length){
                    Movie.updateOne({ movieID: torrentID }, { status: "READY" }, (err, raw) => {
                        if (err)
                            console.log(err);
                        else
                            console.log({status: "READY", movieID: torrentID});
                    })
                    
                    readySet = true;
                }

            }
        })
    })

    torrent.on('done', function () {

        // TORRENT COMPLETED
        console.log({status: "COMPLETED", movieID: torrentID});
        if (resSend == false){
            res.send({status: "COMPLETED", movieID: torrentID})
            resSend = true;
        }
        completedBar.stop();

        // SAVE DATA TO DATABASE
        Movie.updateOne({ movieID: torrentID}, { status: "COMPLETE"}, (err, raw) => {
            if (err)
                console.log(err);
            else
                console.log(raw);
        })
    })

    torrent.on('error', function (err) {

        // TORRENT ERROR
            // SET RESPONSE STATUS TO ERROR AND INCLUDE ERROR MESSAGE
        if (resSend == false){
            res.send({status: "ERROR", message: err, movieID: torrentID})
            resSend = true;
        }

        Movie.update(
            { movieID: torrentID },
            { $set: 
                { status: "ERROR"}
            }
        );
    })

})

router.get('/stream/:movieID', (req, res) => {
    
    var movieID = req.params.movieID;

    var query = { "movieID": movieID };

    Movie.findOne(query, function (err, movieMeta) {
        
        if (err || !movieMeta || ( movieMeta && movieMeta.status == "STARTED" )){

            res.send({error: err, movieMetaExists: (movieMeta) ? "true" : "false", movieMeta: movieMeta});

        }else{

            // CONSTRUCT PATH TO MOVIE FILE
            const path = './assets/' + movieMeta.movieID + '/' + movieMeta.moviePath;
            
            // IF TORRENT BUSY -- ADJUST TO USE DATABASE SEARCH
            if ((torrent = client.get(movieMeta.infoHash)) != null){
                console.log('In client!');
                // FIND TORRENT WITH MP4 EXTENSION -- CONVERT TO FIND ANY MOVIE
                var file = torrent.files[0];
                torrent.files.forEach(element => {
                    if (element.length > file.length)
                        file = element;
                });

                // GET SOME METADATA
                const fileSize = file.length
                const range = req.headers.range
                var stream = null;

                // IF REQUEST INCLUDES RANGE REQUEST -- REQUEST IS COMING FROM MEDIA PLAYER
                if ( range ) {

                    // DECODE RANGE REQUEST

                    const parts = range.replace(/bytes=/, "").split("-")
                    const start = parseInt(parts[0], 10)
                    const end = parts[1]
                        ? parseInt(parts[1], 10)
                        : fileSize - 1
                    const chunksize = (end - start) + 1

                    // CALCULATE PIECES BASED ON RANGE REQUEST -- FOR PIECE PRIORITIZATION
                    startPieceToGet = Math.floor((start + file.offset) / torrent.pieceLength);
                    endPieceToGet = Math.floor((end + file.offset) / torrent.pieceLength);

                    // CONSTRUCT HEADER TO BE ATTATCHED TO RESPONSE
                    const head = {
                        'Transfer-Encoding': 'chunked',
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/' + movieMeta.movieStats.type,
                        'Content-Codec': 'theora, vorbis'
                    }
                    console.log({
                        contentHead: head,
                        bytePiece: { 
                            requestedByteStart: start,
                            fileOffset: file.offset,
                            bytesToPieceStart: startPieceToGet,
                            bytesToPieceEnd: endPieceToGet
                        }
                    });

                    // IF REQUEST IS NOT ENTIRE FILE
                    // if (endPieceToGet - startPieceToGet != torrent.pieces.length - 1){

                        var resSent = false;
                        var numPieces = endPieceToGet - startPieceToGet;
                        console.log({numPieces: numPieces});
                        for(i = startPieceToGet; i <= endPieceToGet; i++){
                            if (torrent.pieces[i] != null){
                                torrent.select(i, i, torrent.pieces.length + 100, function () {
                                    console.log({callbackFor: i});
                                    if (resSent == false){

                                        var tempNumPieces = endPieceToGet - startPieceToGet;
                                        for (i = startPieceToGet; i <= endPieceToGet; i++) {
                                            if (torrent.pieces[i] == null)
                                                tempNumPieces--;
                                        }

                                        if (tempNumPieces == 0){
                                            resSent = true;
                                            // UNSET HIGH PRIORITY
                                            torrent.deselect(startPieceToGet, endPieceToGet);

                                            // CREATE READSTREAM FOR RANGE AND PIPE RESULT
                                            stream = fs.createReadStream(path, { start, end });

                                            // ADD TO HEAD -- STATUS INCOMPLETE FILE ( NECESSARY FOR STREAMING )
                                            res.writeHead(206, head);
                                            stream.pipe(res);
                                        }

                                    }

                                })
                            }else{
                                numPieces--;
                            }
                        }
                        console.log({afterNumPieces: numPieces});
                        if (numPieces == 0 || movieMeta.status == "COMPLETE"){
                            resSent = true;
                            // IF REQUEST INCLUDES PIECES THAT ARE ALREADY DOWNLOADED -- CREATE STREAM
                            stream = fs.createReadStream(path, { start, end })
                            res.writeHead(206, head);
                            stream.pipe(res);
                        }
                    
                } else {

                    res.send(movieMeta);
                }
            } else {

                if ( range ) {

                    // DECODE RANGE REQUEST

                    const parts = range.replace(/bytes=/, "").split("-")
                    const start = parseInt(parts[0], 10)
                    const end = parts[1]
                        ? parseInt(parts[1], 10)
                        : fileSize - 1
                    const chunksize = (end - start) + 1

                    // CALCULATE PIECES BASED ON RANGE REQUEST -- FOR PIECE PRIORITIZATION
                    startPieceToGet = Math.floor((start + file.offset) / torrent.pieceLength);
                    endPieceToGet = Math.floor((end + file.offset) / torrent.pieceLength);

                    // CONSTRUCT HEADER TO BE ATTATCHED TO RESPONSE
                    const head = {
                        'Transfer-Encoding': 'chunked',
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                        'Content-Length': chunksize,
                        'Content-Type': 'video/' + movieMeta.movieStats.type,
                        'Content-Codec': 'theora, vorbis'
                    }
                    stream = fs.createReadStream(path, { start, end })
                    res.writeHead(206, head);
                    stream.pipe(res);

                }else{

                    res.send(movieMeta);
                    
                }
            }
        }
    });
})

router.delete('/delete/:movieID', (req, res) => {
    // DELETE TORRENT
    var movieID = req.params.movieID;

    Movie.findByIdAndDelete({ infoHash: movieMeta.infoHash }, function (err, movie) {

        // IF TORRENT IS CURRENTLY DOWNLOADING
        if (client.get(torrentLink)) 
            client.remove(torrentLink);

        rimraf('./assets/' + movie.infoHash, function (err) {
            if (err)
                console.log(err);
        });
    })
});

module.exports = router;