var router = require('express').Router();
var auth = require('./../../auth');
//var utils = require('./../../../utils/commons').utils;
//var errors = require('./../../../constants/errors').errors;
//const Users = require('./../../../db/models/user');
const Pdfs = require('./../../../db/models/pdf');

var mongoose = require('mongoose');

var conn = mongoose.connections;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
let gfs = null, storage = null, upload = null;

mongoose.connection.on('connected', (db) => {
	gfs = Grid(DB, mongoose.mongo);

	storage = GridFsStorage({
		gfs : gfs,
		root: 'pdf'
	});

	upload = multer({ //multer settings for single upload
		storage: storage
	}).single('file');
});

/** Methods */
router.get('/pdf', auth, (req, res, next) => {
	let user = req.user;
	LOG.debug('getPDF from user', user.nick);
	Pdfs.find({user: user._d}, {name: 1} , (err, pdfs) => {
		if(err) {
			return handlerError(res, err,'Error find pdfs from user', pdfs, 400);
		}
		return res.status(200).send(pdfs);
	});
	
});

router.get('/pdf/:filename', auth, (req, res, next) => {
	let user = req.user;
	let fileName = req.params.filename;
	LOG.debug('Detail PDF', fileName);
	gfs.collection('pdf');

	/* Check if file exist */
	gfs.files.find({filename: fileName}).toArray((err,files) => {
		if(!files || files.length === 0){
			return handlerError(res, null,'File not found', files, 404);
		}
		let readStream = gfs.createReadStream({
			filename: files[0].filename,
			root: 'pdf'
		});
		res.set('Content-type', files[0].contentType);
		return readStream.pipe(res);
	});
});

router.post('/pdf', auth, (req, res, next) => {
	/**
	 * { 
	 * 	
	 *  name: string
	 * 	metadata: base64,
	 * 	idUser : int
	 * }
	 */
	let user = req.user; 
	let body = req.body;
	LOG.debug('Post pdf: ', body);
	gfs.exist({filename: body.name}, (err, found) => {
		if(err) {
			return handlerError(res, null, 'Error exist', err, 500);
		}
		if(found){
			return handlerError(res, null,'File exist', files, 404);
		}
		upload(req, res, (err) => {
			if(err) {
				return handlerError(res, err, 'Error upload file', body.name, 500);
			}
			return res.status(201);
		});
	});
});

router.delete('/pdf', auth, (req, res, next) =>{
	let body = req.body;
	LOG.debug('Delete pdf', idPdf);
	gfs.exist({filename: body.name}, (err, found) => {
		if(err) {
			return handlerError(res, null, 'Error exist', err, 500);
		}
		if(!found){
			return handlerError(res, null,'File not exist', files, 404);
		}
		gfs.remove({
			_id: files[0]._id
		}, (err) => {
			return handlerError(res, err, 'Error remove file', body.name, 500);
		});
	});
});

function handlerError(res, error, msg, attr, statusCode) {
	LOG.error(msg,attr)
	return res.status(statusCode).send(error)
}



module.exports = router;