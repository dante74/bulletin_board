const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /user',
    })
})

router.get('/:userID', (req, res, next) => {
    const { userID } = req.params;
    res.status(200).json({
        message: `GET requests to special /user ${userID}`,
    })
})


module.exports = router;