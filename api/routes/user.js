const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        });
})

router.get('/:userID', (req, res, next) => {
    const { userID } = req.params;
    res.status(200).json({
        message: `GET requests to special /user ${userID}`,
    })
})

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