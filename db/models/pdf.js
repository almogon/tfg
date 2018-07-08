'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var PdfSchema = Schema({
    name: String,
    user: { 
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'User',
        required: true
    },
    base64: String,
    favorite : Boolean
});

module.exports = mongoose.model('Pdfs', PdfSchema);