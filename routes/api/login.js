var router = require('express').Router();
var ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
var createToken = require('./../../utils/commons').createToken;
var UserController = require('./../../db/controllers/user');

router.post('/', function(req, res){
	var body = req.body;
	var nick = body.nick;
	var pass = body.password;
	LOG.debug('Login: ' + nick);
	UserController.findByNickAndPass(nick, pass)
		.then((user) => {
			if(utils.isNullOrEmptyOrUndefined(user)) {
				LOG.error('Login fail: credentials not valid');
				return res.status(ERRORS.USER_NOT_VALID.status).send(ERRORS.USER_NOT_VALID);
			}
			return res.json(createToken(user));
		})
		.catch((err) => {
			LOG.error(err);
			return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
		});
});

router.post('/register', function(req, res, next){
	var body = req.body;
	var nick = body.nick;
	var pass = body.password;

	var userDB = UserController.findByNickAndPass(nick, pass);
	if(!utils.isNullOrEmptyOrUndefined(userDB)) {
		LOG.error('Log in fail: user was registered');
		return res.sendStatus(ERRORS.USER_NOT_VALID.status).json(ERRORS.USER_NOT_VALID);
	}
	UserController.saveUser(nick, pass , createToken(userDB));
});

module.exports = router;