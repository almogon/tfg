var express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    routes = require('./routes/routes'),
    log4js = require('log4js'),
    constants = require('./constants/constants').constants,
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// Globals
global._ = require('underscore');
global.moment= require('moment');
global.store = require('store');
global.LOG = log4js.getLogger();
LOG.level = 'info';

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

var port = constants.PORT;

app.listen(port, () => {
  console.log('Node server running on http://localhost:' + port);
});

module.exports = app;