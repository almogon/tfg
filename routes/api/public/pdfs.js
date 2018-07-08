var router = require('express').Router();
var auth = require('./../../auth');
var mongoose = require('mongoose');
const PdfsController = require('./../../../db/controllers/pdf');



/** Methods */
router.get('/', auth, (req, res, next) => {
	let user = req.user;
	LOG.debug('List PDF from user', user.nick);
	PdfsController.find({user: mongoose.Types.ObjectId(user._id)}, {name: 1})
		.then((pdfs) => {
			return res.status(200).send(pdfs);
		}).catch((err)=>{
			return res.status(err.status).send(err);
		});
});

router.get('/:filename', auth, (req, res, next) => {
	let user = req.user;
	let filename = req.params.filename;
	LOG.debug('Detail PDF', filename);
	PdfsController.findByFilename({user: mongoose.Types.ObjectId(user._id), name: filename}, {})
		.then((pdfs) => {
			return res.status(200).send(pdfs);
		}).catch((err) => {
			return res.status(err.status).send(err);
		});
});

router.post('/', auth, (req, res, next) => {
	let user = req.user; 
	let body = req.body;
	LOG.debug('Post pdf: ', body);
	//Añadir busqueda primero del PDF para no tener pdf repetidos
	PdfsController.savePdf(_.extend(body, {
		user: user._id
	})).then(() => {
		return res.status(201).send();
	}).catch((err) => {
		return res.status(err.status).send(err);
	});
});

router.delete('/', auth, (req, res, next) =>{
	let body = req.body;
	LOG.debug('Delete pdf', idPdf);
	
});

module.exports = router;