var User = require('./../models/user');

exports.findByNickAndPass = (nick, pass) => {
    return new Promise((res, rej) => {
        LOG.info('find user: ' + nick + '-' + pass);
        User.find( { nick : nick, pass : pass}, (err, user) => {
            if (err) {
                LOG.error('error find user:', nick);
                rej(err);
            }
            res(user);
        } );
    });
    
};

exports.saveUser = ( nick, pass, token) => {
    LOG.info('Create new user: ' , user);
    var user = new User({
        nick: nick,
        pass: pass,
        token: token
    });
    User.save((err) => {
        if(err) {
            LOG.error('User not save: ',err);
        }
        LOG.info(user);
        return 'user';
    });
}