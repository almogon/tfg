const User = require('./../models/user');

exports.findByNickAndPass = (nick, password) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', nick);
        User.findOne( { nick : nick, password : password}, (err, user) => {
            if(err) {
                LOG.error('error mongo find user by nick and pass', err);
                reject(err);
            }
            notFound(user, reject);
            resolve(user[0]);
        } );
    });
};

exports.find = (filter, attr) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', filter);
        User.find(filter, attr, (err, user) => {
            if(err) {
                LOG.error('error mongo find user', err);
                reject(err);
            }
            notFound(user, reject);
            resolve(user);
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
                reject(err);
            }
            LOG.debug('User save');
            resolve();
        });
    });   
}

notFound(result, reject) => {
    if(result.length === 0) {
        LOG.error('User - Field not found');
        reject();
    }
}