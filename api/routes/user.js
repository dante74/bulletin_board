const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');


router.get('/', checkAuth, (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(501).json({
                error: err,
            })
        });
})

router.get('/:userID', checkAuth, (req, res, next) => {
    const { userID } = req.params;
    res.status(200).json({
        message: `GET requests to special /user ${userID}`,
    })
})

router.post('/login', (req, res, next) => {
    // {
    //     "name": "Legolas",
    //     "password": "Legolas"
    // }

    User.find({ name: req.body.name })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Authorization Failed',
                });
            }
            if (user[0].password === req.body.password) {
                return res.status(200).json({
                    message: 'Authorization Successfull'
                })
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
});


router.post('/', (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /user',
                createdUser: user
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        });
});

router.delete('/:userID', (req, res, next) => {
    const { userID } = req.params;
    User.remove({ _id: userID })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        });
})
module.exports = router;