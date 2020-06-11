const express = require('express');
const app = express();
const announcementRoutes = require('./api/routes/announcement')
const userRoutes = require('./api/routes/user')

app.use('/announcement', announcementRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "It works",
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('It works');
})




