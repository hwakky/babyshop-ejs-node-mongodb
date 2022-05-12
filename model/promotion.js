var mongoose = require('mongoose');

var promotionSchema = new mongoose.Schema({
    image : String
});

module.exports = mongoose.model('Promotion', promotionSchema);