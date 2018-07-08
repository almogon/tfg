var router = require('express').Router();
var ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
var createToken = require('./../../utils/commons').createToken;
var UserController = require('./../../db/controllers/user');
var i18n = require('i18n');

router.post('/', (req, res) => {
	let body = req.body;
	let nick = body.nick;
	let password = body.password;
	LOG.debug('Login' + nick);
	UserController.findByNickAndPass(nick, password)
		.then((user) => {
			if(utils.isNullOrEmptyOrUndefined(user)) {
				LOG.error(i18n.__('ERROR-LOGIN'));
				return res.status(ERRORS.USER_NOT_VALID.status).send(ERRORS.USER_NOT_VALID);
			}
			return res.json(createToken(user));
		})
		.catch((err) => {
			LOG.error(err);
			return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
		});
});

module.exports = router;