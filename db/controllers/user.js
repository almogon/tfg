let User = require('./../models/user');
const ERRORS = require('./../../constants/errors').errors;
const UTILS = require('./../../utils/commons').utils;

exports.findByNickAndPass = (nick, password) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', nick);
        User.findOne( { nick : nick, password : password}, (err, user) => {
            if(err) {
                LOG.error('error mongo find user by nick and pass', err);
                return reject(ERRORS.GENERAL);
            }
            if(UTILS.isNullOrEmptyOrUndefined(user)) {
                LOG.error('User not found');
                return reject(ERRORS.USER_NOT_FOUND);
            }
            return resolve(user);
        } );
    });
};

exports.find = (filter, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', filter);
        User.find(filter, attr, (err, user) => {
            if(err) {
                LOG.error('error mongo find user', err);
                return reject(ERRORS.GENERAL);
            }
            return resolve(user);
        });
    });
};

exports.isRegister = (nick, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', nick);
        User.find({nick: nick}, attr, (err, user) => {
            if(err) {
                LOG.error('error mongo find user', err);
                return reject(ERRORS.GENERAL);
            }
            if(!UTILS.isNullOrEmptyOrUndefined(user)) {
                LOG.error('Register fail: user is in db');
				return reject(ERRORS.USER_REGISTERED);
            }
            return resolve();
        });
    });
};

exports.saveUser = (userRegister) => {
    return new Promise((resolve, reject) => {
        LOG.info('Create new user' , userRegister.nick);
        let user = new User(userRegister);
        user.save((err) => {
            if(err) {
                LOG.error('User not save', err);
                return reject(ERRORS.GENERAL);
            }
            return resolve();
        });
    });   
}

