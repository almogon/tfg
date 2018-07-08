var router = require('express').Router();
var path = '/api';

router.use('/login', require('./api/login.js'));
router.use('/register', require('./api/register.js'));
router.use(path + '/pdf', require('./api/public/pdfs'));

module.exports = router;
