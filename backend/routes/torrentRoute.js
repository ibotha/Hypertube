const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');
const aorg      = require('../functions/archive.org');

router.get('/getlist', (req, res) => {
  yts.getList(1 ,{}, result => {
    res.status(200).jsonp(result);
  });
});

router.get('/getarchive', (req, res) => {
  aorg.getArchiveList('mediatype:(movies)', result => {
    res.status(200).json(result);
  })
})

module.exports = router;
