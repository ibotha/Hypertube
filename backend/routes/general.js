const express		= require('express');
const router		= express.Router();

router.get('/', function(req, res, next) {
	res.end('{"msg":"OK"}');
})

module.exports = router;