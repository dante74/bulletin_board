const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Announcement = require('../models/announcement');

router.get('/', (req, res, next) => {
    Announcement.find()
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

router.post('/', (req, res, next) => {

    const announcement = new Announcement({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        body: req.body.body,
        category: req.body.category,
        author: req.body.author
    });

    announcement
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request to /announcement',
                createdAnnouncement: announcement
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            })
        });
});

router.get('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    console.log(typeof (announcementID));
    Announcement.findById(announcementID)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found',
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

router.patch('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.changeName] = ops.value;
    }
    // [
    //     { "changeName" : "body", "value" : "Nie ma tego lata komarów"}
    // ]
    Announcement.update({ _id: announcementID }, { $set: updateOps })
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

router.delete('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    Announcement.remove({ _id: announcementID })
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