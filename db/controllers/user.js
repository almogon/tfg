exports.findByNickAndPass = function (nick, pass) {
    User.find( { nick : nick, pass: pass}, (err, user) => {
        if (err) {
            return handleError(err);
        }
        return user;
    } );
};