'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    password: String,
    token: String
});

module.exports = mongoose.model('Users', UserSchema);