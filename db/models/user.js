'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: String,
    surname: String,
    nick: { type: String, required: true},
    password: { type:String, required: true},
    token: String
});

module.exports = mongoose.model('Users', UserSchema);