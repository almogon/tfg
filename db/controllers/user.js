var User = require('./../models/user');

exports.findByNickAndPass = (nick, password) => {
    return new Promise((resolve, reject) => {
        LOG.info('find user', nick);
        User.find( { nick : nick, password : password}, (err, user) => {
            if (err) {
                LOG.error('error find user:', nick);
                reject(err);
            }
            resolve(user);
        } );
    });
    
};

exports.saveUser = (userRegister) => {
    return new Promise((resolve, reject) => {
        LOG.info('Create new user' , userRegister.nick);
        var user = new User(userRegister);
        user.save((err) => {
            if(err) {
                LOG.error('User not save',err);
                reject(err);
            }
            LOG.debug('User save');
            resolve();
        });
    });
    
}