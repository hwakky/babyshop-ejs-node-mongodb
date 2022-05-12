var mongoose = require('mongoose');
var passportlocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({ 
    username : {
        type : String,
        unique : true
    },
    email : {
        type : String,
        unique : true
    },
    password : String,
    cart :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    favorite:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    fullname : String,
    address : String,
    image : String,
    phone : String,
    admin : {type : Boolean, default : false},
    masterAdmin : {type : Boolean, default : false}
})

UserSchema.plugin(passportlocalMongoose);

module.exports = mongoose.model('User', UserSchema);