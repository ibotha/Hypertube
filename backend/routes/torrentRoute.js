const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');
const aorg      = require('../functions/archive.org');

router.get('/getlist', (req, res) => {
  yts.getList(req.query ,{}, result => {
    res.status(200).jsonp(result);
  });
});

router.get('/getarchive', (req, res) => {
  aorg.getArchiveList(result => {
    res.status(200).jsonp(result);
  })
})

module.exports = router;
