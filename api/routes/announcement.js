const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /announcement',
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST requests to /announcement',
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