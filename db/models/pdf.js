'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var PdfSchema = Schema({
    id: int,
    datos: Base64,
    user: { type: Schema.Objectid , ref: 'User'}
});

module.exports = mongoose.model('Pdf', PdfSchema);