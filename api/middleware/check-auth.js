const User = require('../models/user');

module.exports = (req, res, next) => {
    let auth = req.headers.authorization;
    if (!auth) {
        next(new Error('Brak autoryzacji'));
    } else {
        let parts = auth.split(' ');
        console.log(parts);
        let authorization = new Buffer.from(parts[1], 'base64').toString().split(':');
        let name = authorization[0];
        let pass = authorization[1]
        console.log(name);
        console.log(pass);
        User.find({ name })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(404).json({
                        message: 'Authorization Failed',
                    });
                }
                if (user[0].password === pass) {
                    // res.status(200).json({
                    //     message: 'Authorization Successfull'
                    // })
                    //console.log('ok');
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Authorization failed'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    }
}