var router = require('express').Router();
var ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
var UserController = require('./../../db/controllers/user');

router.post('/', (req, res) => {
	LOG.debug('Register user', req.body.nick);
	UserController.findByNickAndPass(req.body.nick, req.body.password)
		.then(user => {
			if(!utils.isNullOrEmptyOrUndefined(user)) {
				LOG.error('Register fail: user is in db');
				return res.status(ERRORS.USER_REGISTERED.status).send(ERRORS.USER_REGISTERED);
			}
            UserController.saveUser(req.body);
		})
		.catch((err) => {
			LOG.error(err);
			return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
		});
});

module.exports = router;