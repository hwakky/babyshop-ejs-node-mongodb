var express = require('express');
const   Item = require('../model/itemall');
        router = express.Router();
        User = require('../model/user');
        passport = require('passport');
        multer = require('multer');
        path = require('path');
        middlewareObj = require('../middleware/index');
        storage = multer.diskStorage({
                    destination : function(req, file, callback){
                        callback(null, './public/uploads/');
                    },
                    filename: function(req, file, callback){
                        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                    }
        }),
        imageFilter = function(req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
                return callback(new Error('Only jpg, jpeg, png and gif image files are allowed!'), false);
            }
            callback(null, true);
        },
        upload = multer({storage : storage, fileFilter : imageFilter});

// profile
router.get('/profile',middlewareObj.isLoggedIn,(req,res) => {
    User.findById(req.user.id,(err,foundUser) => {
        if(err){
            console.log(err);
        } else {
            res.render('profile.ejs',{user:foundUser});
        }
    })
})

router.post('/profile',middlewareObj.isLoggedIn,upload.single('image'),(req,res) => {
    if(req.file){
        req.body.user.image = '/uploads/' + req.file.filename;
    }
    User.findByIdAndUpdate(req.user.id, req.body.user, (err,updateUser) => {
            if(err){
                console.log(err);
            } else {
                req.flash('success' , 'Profile has been updated.');
                res.redirect('/user/profile');
            }
    });
})


router.post('/transaction', (req,res) => {
    Cart.find({userId:req.user.id}).populate('productId').exec((err,foundCart) => {
       if(err){
           console.log(err);
       } else{
           User.findById(req.user.id, (err,foundUser) => {
               if(err){
                   console.log(err);
               } else {
                   res.render('transaction.ejs',{item:foundCart,user:foundUser});
               }
           })
       }
    });
})

router.get('/history', middlewareObj.isLoggedIn,(req,res) => {
    Transaction.find({'user.userId': req.user.id}).populate('product.productId').exec((err,foundTransaction) => {
        if(err){
            console.log(err);
        } else {
            res.render('history.ejs',{transaction:foundTransaction});
        }
    });
})

router.post('/history', middlewareObj.isLoggedIn, (req,res) => {
    User.findById(req.user.id, (err, user) => {
        if(err){
            console.log(err);
        } else {
            Cart.find({userId:req.user.id},(err,foundItem) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(foundItem);
                    var product = [];
                    foundItem.forEach((item) => {
                        product.push({productId:item.productId,quantity:item.quantity,name:item.name,image:item.image,price:item.price,sellerName:item.author.username,sellerImage:item.author.image});
                    })
                    var total = req.body.total;
                        subtotal = req.body.subtotal;
                        fee = req.body.fee;
                        fullname = req.body.fullname;
                        address = req.body.address;
                        phone = req.body.phone;
                        datea = new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok'});
                        newTransaction = {user:{userId:req.user.id,fullname:fullname,address:address,phone:phone},product:product,subtotal:subtotal,shippingFee:fee,total:total,date:date};
                    Transaction.create(newTransaction, (err,transactionAdded) => {
                    if(err){
                        console.log(err);
                    } else {
                        foundItem.forEach((foundItem) => {
                            Item.findByIdAndUpdate(foundItem.productId,{$inc:{sold:foundItem.quantity,stock:-foundItem.quantity}},(err,updateStock) => {
                                if(err){
                                    console.log(err);
                                } else {
                                }
                            });
                        });
                        User.findByIdAndUpdate(req.user.id,{$set:{cart:[]}},(err,foundUser) => {
                            if(err){
                                console.log(err);
                            } else {
                                Cart.remove({userId:req.user.id},(err, removeCart) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        res.redirect('/user/history');
                                    }
                                })
                            }
                        })
                    }
                    })
                }
            })
        }
    })
})

router.get('/favorite', (req,res) => {
    User.findById(req.user.id).populate({path:'favorite',populate:{path:'comments'}}).exec((err,foundUser) => {
        if(err){
            console.log(err);
        } else {
            res.render('favoriteProduct.ejs',{item:foundUser.favorite});
        }
    })
})

router.post('/favorite/add/:id', (req,res) => {
    User.findByIdAndUpdate(req.user.id,{$push:{favorite:req.params.id}},{new:true}, (err,favoriteItem) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
})

router.post('/favorite/remove/:id',(req,res) => {
    User.findByIdAndUpdate(req.user.id,{$pull:{favorite:req.params.id}},{new:true}, (err,favoriteItem) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
})
module.exports = router ;