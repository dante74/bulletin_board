const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const announcementRoutes = require('./api/routes/announcement')
const userRoutes = require('./api/routes/user')

mongoose.connect('mongodb+srv://dante:' + process.env.MONGO_ATLAS_PASSWD + '@cluster0-kkeyt.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/announcement', announcementRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
    });
})

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "It works",
//     });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('It workss');
})




