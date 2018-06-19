var router = require('express').Router();
var auth = require('./../../auth');
var utils = require('./../../../utils/commons').utils;
var errors = require('./../../../constants/errors').errors;


/** Methods */
router.get('/pdf', auth, (req, res, next) => {
	var user = req.user;
	LOG.debug('getPDF');
	// llamada mongoose que trae la lista de pdf de este usuario
});

router.get('/pdf/:filename', auth, (req, res, next) => {
	var user = req.user;
	LOG.debug('Detail PDF');
	// llamada mongoose que trae la lista de pdf de este usuario
});

router.post('/pdf', auth, (req, res, next) => {
	/**
	 * { 
	 * 	idPdf : int,
	 *  name: string
	 * 	metadata: base64,
	 * 	idUser : int
	 * }
	 */
	var body = req.body;
	LOG.debug('Post pdf: ', body);
});

router.put('/pdf', auth, (req, res, next) =>{
	var body = req.body;
	LOG.debug('Put pdf', idPdf);
});


module.exports = router;