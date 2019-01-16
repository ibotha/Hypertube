const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');

router.get('/getlist', (req, res) => {
  yts.getList(req.query.limit ,{}, result => {
    console.log(result);
    res.status(200).json(result);
  });
});

module.exports = router;
