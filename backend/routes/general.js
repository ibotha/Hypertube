const express		= require('express');
const router		= express.Router();

router.get('*', function(req, res, next) {
	res.end('{"Msg":"OK"}');
});

module.exports = router;