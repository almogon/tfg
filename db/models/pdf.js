'use strict'
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
var PdfSchema = Schema({
    name: { type: String, required: true },
    user: { 
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'User',
        required: true
    },
    base64: String,
    favorite : Boolean
});

module.exports = mongoose.model('Pdf', PdfSchema);