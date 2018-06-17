var User = require('./../models/user');

exports.findByNickAndPass = function (nick, pass) {
    LOG.info('find user: ', nick);
    User.find( { nick : nick, pass: pass}, (err, user) => {
        if (err) {
            LOG.error('error find user:', nick);
            return null;
        }
        return user;
    } );
};