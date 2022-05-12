var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
    },
    name : String,
    price : Number,
    quantity : Number,
    image :String,
    author:{
        username: String,
        image : String
    }
});

module.exports = mongoose.model('Cart', cartSchema);