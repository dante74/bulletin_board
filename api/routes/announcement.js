const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Announcement = require('../models/announcement');

const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    console.log(req.query);
    //localhost:3000/announcement/?author=Gandalf
    Announcement.find(req.query)
        .select('name body category author date')
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
        author: req.body.author || 'anonymous',
        date: new Date()
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
    //console.log(typeof (announcementID));
    Announcement.findById(announcementID)
        .exec()
        .then(doc => {
            //console.log("From database", doc);
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


router.patch('/:announcementID', checkAuth, (req, res, next) => {
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

router.delete('/:announcementID', checkAuth, (req, res, next) => {
    const { announcementID } = req.params;

    let auth = req.headers.authorization;
    let parts = auth.split(' ');
    console.log(parts);
    let authorization = new Buffer.from(parts[1], 'base64').toString().split(':');
    let name = authorization[0];

    Announcement.findById(announcementID)
        .exec()
        .then(doc => {
            if (doc.author === name || name === "admin") {
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
            } else {
                res.status(500).json({
                    error: "No athorized to this operation",
                })
            }

        })

})
module.exports = router;