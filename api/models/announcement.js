const mongoose = require('mongoose');
const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    body: String,
    category: { type: String, require: true },
    author: String

})

module.exports = mongoose.model('Announcement', announcementSchema);