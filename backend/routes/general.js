const express		= require('express');
const router		= express.Router();

router.post('*', function(req, res, next) {
	//Technically a 404
	res.end(404);
})

router.get('*', function(req, res, next) {
	//Technically a 404
	res.end('{"Msg":"OK"}');
});

module.exports = router;