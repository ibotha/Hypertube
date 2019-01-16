const express		= require('express');
const router		= express.Router();
const yts       = require('../functions/fetchJsonYTS');

router.get('/getlist', (req, res) => {
  yts.getList(10,{}, result => {
    res.status(200).json(result);
  });
});

module.exports = router;
