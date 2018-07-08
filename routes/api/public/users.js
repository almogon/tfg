var router = require('express').Router();
var auth = require('./../../auth');
var utils = require('./../../../utils/commons').utils;
var errors = require('./../../../constants/errors').errors;
const Users = require('./../../../db/models/user');



/** Methods */
router.get('/pdf', auth, (req, res, next) => {
	let user = req.user;
	LOG.debug('getPDF from user', user.nick);
	Users.find({nick: user.nick}, (err, user) => {
		if(err) {
			handlerError(err,'Error find user',user,400);
		}

		return res.status(200).send(user)
	});
	
});

router.get('/pdf/:filename', auth, (req, res, next) => {
	let user = req.user;
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
	let user = req.user; 
	let body = req.body;
	LOG.debug('Post pdf: ', body);
	Users.find({nick: user.nick}, (err, user) => {
		if(err) {
			handlerError(err,'Error find user',user,400);
		}
		if(!user.pdf) {
			user['pdf'] = [body];
		}else {
			user.pdf.push(body);
		}
		Users.update({nick: user.nick}, {$set: {pdf: user.pdf}}, (err) => {
			LOG.error('Error update user', user.nick);
		})
		return res.status(201)
	});
});

router.put('/pdf', auth, (req, res, next) =>{
	let body = req.body;
	LOG.debug('Put pdf', idPdf);
});

function handlerError(error, msg, attr, statusCode) {
	LOG.error(msg,attr)
	return res.status(statusCode).send(error)
}


module.exports = router;