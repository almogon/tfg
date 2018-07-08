var router = require('express').Router();
var auth = require('./../../auth');
const ERRORS = require('./../../../constants/errors').errors;
const PdfsController = require('./../../../db/controllers/pdf');



/** Methods */
router.get('/', auth, (req, res, next) => {
	let user = req.user;
	LOG.debug('getPDF from user', user.nick);
	PdfsController.find({user: user._d}, {name: 1})
		.then((pdfs) => {
			return res.status(200).send(pdfs);
		}).catch(()=>{
			return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
		});
});

router.get('/:filename', auth, (req, res, next) => {
	let user = req.user;
	let filename = req.params.filename;
	LOG.debug('Detail PDF', fileName);
	PdfsController.find({user: user._d, name:filename}, {_id: 1, name: 1})
		.then((pdfs) => {
			if(pdfs.length === 0){
				return res.status(ERRORS.PDF_NOT_FOUND.status).send(ERRORS.PDF_NOT_FOUND);
			}
			return res.status(200).send(pdfs);
		}).catch(() => {
			return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
		});
});

router.post('/', auth, (req, res, next) => {
	let user = req.user; 
	let body = req.body;
	LOG.debug('Post pdf: ', body);
	PdfsController.savePdf(_.extend(body, {
		user: user._id
	})).then(() => {
		return res.status(201);
	}).catch(() => {
		return res.status(ERRORS.GENERAL.status).send(ERRORS.GENERAL);
	});
});

router.delete('/', auth, (req, res, next) =>{
	let body = req.body;
	LOG.debug('Delete pdf', idPdf);
	
});

module.exports = router;