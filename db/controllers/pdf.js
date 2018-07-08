let Pdf = require('./../models/pdf');
const ERRORS = require('./../../constants/errors').errors;
const UTILS = require('./../../utils/commons').utils;

exports.findByFilename = (filter, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find pdf', filter);
        Pdf.findOne(filter, attr, (err, pdf) => {
            if (err) {
                LOG.error('error mongo find pdf by name', err);
                return reject(ERRORS.GENERAL);
            }
            if(UTILS.isNullOrEmptyOrUndefined(pdf)) {
                LOG.error('PDF - Field not found');
                return reject(ERRORS.PDF_NOT_FOUND);
            }
            return resolve(pdf);
        } );
    });
};

exports.find = (filter, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find pdf', filter);
        Pdf.find( filter, attr, (err, pdf) => {
            if (err) {
                LOG.error('error mongo find pdf', err);
                return reject(ERRORS.GENERAL);
            }
            return resolve(pdf);
        } );
    });
};

exports.savePdf = (pdfSave) => {
    return new Promise((resolve, reject) => {
        LOG.info('Create new pdf' , pdfSave.name);
        let pdf = new Pdf(pdfSave);
        pdf.save((err) => {
            if(err) {
                LOG.error('Pdf not save', err);
                return reject(ERRORS.GENERAL);
            }
            return resolve();
        });
    });
}