var router = require('express').Router();
const ERRORS = require('./../../constants/errors').errors;
var utils = require('./../../utils/commons').utils;
const UserController = require('./../../db/controllers/user');

router.post('/', (req, res) => {
	LOG.debug('Register user', req.body.nick);
	UserController.isRegister(req.body.nick, req.body.password)
		.then(() => {
			UserController.saveUser(req.body)
				.then(() => {
					return res.status(201).send();
				}).catch((err) => {
					return res.status(err.status).send(err);
				});
		})
		.catch((err) => {
			return res.status(err.status).send(err);
		});
});

module.exports = router;