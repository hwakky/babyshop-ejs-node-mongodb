var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    category : String,
    image : String
});

module.exports = mongoose.model('Category', categorySchema);