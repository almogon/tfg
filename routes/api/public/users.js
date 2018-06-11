var router = require('express').Router();
var auth = require('./../../auth');
var utils = require('./../../../utils/commons').utils;
var errors = require('./../../../constants/errors').errors;

router.get('/pdf', auth, function(req, res, next){
	var user = req.user;
	// llamada mongoose que trae la lista de pdf de este usuario
});

router.post('/pdf', auth, function(req, res, next){
	/**
	 * {
	 * 	idUsuario : int
	 * 	pdf : { 
	 * 		idPdf : int
	 * 		metadatos: base64
	 * 	}
	 * }
	 */
	var body = req.body;
	LOG.debug('Post pdf', idPdf);
	if(utils.isNullOrEmptyOrUndefined(idPdf)) {
		return res.status(404).send(errors.PARAMS_NOT_VALID);
	}
});

router.put('/pdf', auth, function(req, res, next){
	var body = req.body;
	LOG.debug('Put pdf', idPdf);

});


module.exports = router;