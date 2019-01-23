const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');
const aorg      = require('../functions/archive.org');

router.get('/getlist', (req, res) => {
  yts.getList(req.query, result => {
      res.status(200).jsonp(result);
  });
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
