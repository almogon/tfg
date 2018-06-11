var router = require('express').Router();
var path = '/api';

router.use('/login', require('./api/login.js'));
router.use(path + '/users', require('./api/public/users'));

module.exports = router;
