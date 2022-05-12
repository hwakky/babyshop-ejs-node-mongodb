var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({

    user : {
        userId : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fullname : String,
        address : String,
        phone : String
    },
    product :[
        {
            productId :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            quantity : Number,
            name : String,
            image : String,
            price : Number,
            sellerName : String,
            sellerImage : String
        }
    ],
    subtotal:Number,
    shippingFee:Number,
    total:Number,
    date:String
});

module.exports = mongoose.model('Transaction', transactionSchema);