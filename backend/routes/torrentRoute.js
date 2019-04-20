const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');
const aorg      = require('../functions/archive.org');
const query     = require('../functions/querydb');
const Movie     = require('../../mediaApi/database/movie.schema');


router.get('/getlist', (req, res) => {
  yts.getList(req.query, result => {
        res.status(200).jsonp(result);
      
  });
});

router.get('/isAvailible/:hash', (req, res) => {
  var id = req.params.hash;
  console.log("Start Search " + id);
  Movie.findOne({infoHash: id}).then(val => {
    console.log("Search done");
    if (val)
      res.status(200).jsonp(JSON.stringify(val));
    else
      res.status(200).jsonp(JSON.stringify({state: "NULL"}));
  }).catch(err => {
    console.log("an error has occured " + err)
  })
});

router.get('/getarchive', (req, res) => {
  aorg.getArchiveList(result => {
    if (typeof result == 'object')
      res.status(200).jsonp(result);
    else
      res.status(200).jsonp({"Error": "Eish"});
  })
})

module.exports = router;
