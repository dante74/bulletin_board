const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Announcement = require('../models/announcement');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /announcement',
    })
})

router.post('/', (req, res, next) => {
    // const announcement = {
    //     name: req.body.name,
    //     body: req.body.body,
    //     category: req.body.category,
    //     author: req.body.author
    // };

    const announcement = new Announcement({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        body: req.body.body,
        category: req.body.category,
        author: req.body.author
    });

    announcement.save()
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling POST request to /announcement',
        createdAnnouncement: announcement
    })
})


router.get('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    Announcement.findById(announcementID)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    // res.status(200).json({
    //     message: `GET requests to special /announcement ${announcementID}`,
    // })
})

router.patch('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;

    res.status(200).json({
        message: `PATCH requests to special /announcement ${announcementID}`,
    })
})

router.delete('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    res.status(200).json({
        message: `DELETE requests to special  /announcement ${announcementID}`,
    })
})
module.exports = router;