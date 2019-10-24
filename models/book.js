const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorName: String,
    librariesId: Array
});

module.exports = mongoose.model('Books', bookSchema);