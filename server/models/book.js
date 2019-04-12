const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    librariesId: Array
});

module.exports = mongoose.model('Books', bookSchema);