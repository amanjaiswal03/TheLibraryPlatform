const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: String,
    address: String,
    booksid: Array,
    membershipFee: String,
    houseRules: String,
    additionalFeaturs: String,
    reviews: String
});

module.exports = mongoose.model('Libraries', librarySchema);