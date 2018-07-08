var express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    routes = require('./routes/routes'),
    log4js = require('log4js'),
    constants = require('./constants/constants').constants,
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    i18n = require('i18n'),
    mongoose = require('mongoose');

// Globals
global._ = require('underscore');
global.moment= require('moment');
global.LOG = log4js.getLogger();

// Configuration
mongoose.Promise = global.Promise;
LOG.level = 'debug';
console.log(__dirname);

i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: __dirname + '/locales'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

mongoose.connect('mongodb://localhost:27017/tfg', (err, db) => {
  LOG.info('Conexión base de datos realizada correctamente');
});

let port = constants.PORT;
app.listen(port, () => {
  LOG.info('Node server running on http://localhost:' + port);
});

module.exports = app;