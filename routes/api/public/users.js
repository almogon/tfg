var router = require('express').Router();
var auth = require('./../../auth');
var utils = require('./../../../utils/commons').utils;
var errors = require('./../../../constants/errors').errors;
var grid = require('gridfs-stream');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');

mongoose.connect('mongodb://localhost:27017/tfg', function (err, db) {
    console.log('----------------1');
	LOG.info('Conexión base de datos realizada correctamente');
	var gfs = grid(db, mongoose.mongo);

	/** Setting up storage using multer-gridfs-storage */
	var storage = GridFsStorage({
		gfs : gfs,
		filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
		},
		/** With gridfs we can store aditional meta-data along with the file */
		metadata: function(req, file, cb) {
			cb(null, { originalname: file.originalname });
		},
		root: 'ctFiles' //root name for collection to store files into
	});

	var upload = multer({ //multer settings for single upload
		storage: storage
	}).single('file');
});
	




/** Methods */
router.get('/pdf', auth, function(req, res, next){
	var user = req.user;
	LOG.info('llamada a /pdf');
	// llamada mongoose que trae la lista de pdf de este usuario
});

router.get('/pdf/:filename', auth, function(req, res, next){
	var user = req.user;
	LOG.info('llamada a /pdf/filename');
	// llamada mongoose que trae la lista de pdf de este usuario
	gfs.collection('ctFiles'); 
        /** First check if file exists */
        gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
            if(!files || files.length === 0){
                return res.status(404).json(PARAMS_NOT_VALID);
            }
            /** create read stream */
            var readstream = gfs.createReadStream({
                filename: files[0].filename,
                root: "ctFiles"
            });
            /** set the proper content type */
            res.set('Content-Type', files[0].contentType)
            /** return response */
            return readstream.pipe(res);
        });
});

router.post('/pdf', auth, function(req, res, next){
	/**
	 * { 
	 * 	idPdf : int,
	 *  name: string
	 * 	metadata: base64,
	 * 	idUser : int
	 * }
	 */
	var body = req.body;
	LOG.debug('Post pdf: ', body);
	if(utils.isNullOrEmptyOrUndefined(body.pdf) || utils.isNullOrEmptyOrUndefined(body.idUser)) {
		return res.status(404).json(errors.PARAMS_NOT_VALID);
	}
	upload(req, res, err => {
		if(err) {
			res.status(500).json(errors.GENERAL);
		}
		res.status(201);
	});
});

router.put('/pdf', auth, function(req, res, next){
	var body = req.body;
	LOG.debug('Put pdf', idPdf);
});


module.exports = router;