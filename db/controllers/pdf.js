const Pdf = require('./../models/pdf');
let notFound = (result, reject) => {
    if(result.length === 0) {
        LOG.error('PDF - Field not found');
        reject();
    }
}

exports.findByFilename = (filename) => {
    return new Promise((resolve, reject) => {
        LOG.info('find pdf', filename);
        Pdf.find({name : filename}, (err, pdf) => {
            if (err) {
                LOG.error('error find pdf:', filename);
                reject(err);
            }
            notFound(pdf, reject);
            resolve(pdf);
        } );
    });
};

exports.find = (filter, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find pdf', filename);
        Pdf.find( filter, attr, (err, pdf) => {
            if (err) {
                LOG.error('error find pdf:', filename);
                reject(err);
            }
            notFound(pdf, reject);
            resolve(pdf);
        } );
    });
};

exports.savePdf = (pdfSave) => {
    return new Promise((resolve, reject) => {
        LOG.info('Create new pdf' , pdfSave.name);
        let pdf = new Pdf(pdfsave);
        pdf.save((err) => {
            if(err) {
                LOG.error('Pdf not save', err);
                reject(err);
            }
            LOG.debug('Pdf save');
            resolve();
        });
    });
}