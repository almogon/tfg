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
	LOG.debug('Login de ' + nick);
	//llamada a mongoosee con finduser
	var userDB = UserController.findByNickAndPass(nick, pass);
	if(utils.isNullOrEmptyOrUndefined(userDB)) {
		LOG.error('Login fail: credentials not valid');
		return res.sendStatus(ERRORS.USER_NOT_VALID.status).json(ERRORS.USER_NOT_VALID);
	}
	return res.json(createToken(userDB));
});

module.exports = router;