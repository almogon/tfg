var router = require('express').Router();
var ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
var createToken = require('./../../utils/commons').createToken;
var UserController = require('./../../db/controllers/user');

router.post('/', function(req, res, next){
	// We find user in the database, in this case, database is a mock
	var body = req.body;
	var nick = body.nick;
	var pass = body.password;
	LOG.debug('Login: ' + nick);
	//llamada a mongoosee con finduser
	var userDB = UserController.findByNickAndPass(nick, pass)
		.then((user) => {
			LOG.info(user);

			if(utils.isNullOrEmptyOrUndefined(userDB)) {
				LOG.error('Login fail: credentials not valid');
				return res.sendStatus(ERRORS.USER_NOT_VALID.status).json(ERRORS.USER_NOT_VALID);
			}
			return res.json(createToken(userDB));
		})
		.catch((err) => {
			LOG.error(err);
			return res.sendStatus(ERRORS.GENERAL.status).json(ERRORS.GENERAL);
		});
});

router.post('/register', function(req, res, next){
	var body = req.body;
	var nick = body.nick;
	var pass = body.password;
	LOG.debug('Log in by ' + nick);
	//llamada a mongoosee con finduser
	var userDB = UserController.findByNickAndPass(nick, pass);
	if(!utils.isNullOrEmptyOrUndefined(userDB)) {
		LOG.error('Log in fail: user was registered');
		return res.sendStatus(ERRORS.USER_NOT_VALID.status).json(ERRORS.USER_NOT_VALID);
	}
	return UserController.saveUser(nick, pass , createToken(userDB));
});

module.exports = router;