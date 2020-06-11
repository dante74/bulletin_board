const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /announcement',
    })
})

router.post('/', (req, res, next) => {
    const announcement = {
        name: req.body.name,
        category: req.body.category,
    }
    res.status(201).json({
        message: 'Handling POST request to /announcement',
        createdAnnouncement: announcement
    })
})


router.get('/:announcementID', (req, res, next) => {
    const { announcementID } = req.params;
    res.status(200).json({
        message: `GET requests to special /announcement ${announcementID}`,
    })
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