const mongoose = require('mongoose');
const announcementSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    body: String,
    category: { type: String, require: true },
    author: { type: String, require: true }

})

module.exports = mongoose.model('Announcement', announcementSchema);