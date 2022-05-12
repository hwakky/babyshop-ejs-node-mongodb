var express = require('express');
const middlewareObj = require('../middleware');
const cart = require('../model/cart');
const Item = require('../model/itemall');
    router = express.Router();
    User = require('../model/user');
    passport = require('passport');
    Cart = require('../model/cart');
    Transaction = require('../model/transaction');

router.get('/:id', middlewareObj.isLoggedIn, (req,res) => {
    Cart.find({userId:req.params.id}).populate('productId').exec((err,foundCart) =>  {
        if(err){
            console.log(err);
        } else {
            res.render('cart.ejs',{item:foundCart});
            }
    });
})

router.post('/:id/add',middlewareObj.isLoggedIn , (req,res) => {
    var quantity = req.body.quantity;
    Cart.find({productId:req.params.id,userId:req.user._id}, (err, alreadyAdded) => {
        if(err){
            console.log(err);
        } else {
            if(!(typeof alreadyAdded == 'object' && alreadyAdded.length > 0)){
                User.findById(req.user._id, (err,foundUser) => {
                    if(err){
                        console.log(err);
                    } else {
                        Item.findById(req.params.id,(err,foundItem) => {
                            if(err){
                                console.log(err);
                            } else {
                                Cart.create({userId:req.user.id,productId:req.params.id,quantity:quantity,
                                    name:foundItem.name,image:foundItem.image,price:foundItem.price,
                                    'author.username':foundItem.author.username,'author.image':foundItem.author.image}, (err,cartAdded) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        foundUser.cart.push(cartAdded);
                                        foundUser.save();
                                        res.redirect('/cart/' + req.user.id);
                                    }
                                });
                            }
                        })
                    }
                });
            } else {
                Item.findById(req.params.id, (err, checkStock) => {
                    if(err){
                        console.log(err);
                    } else {
                        if(alreadyAdded[0].quantity < checkStock.stock)
                        {
                            var a = parseInt(alreadyAdded[0].quantity) + parseInt(quantity);
                            if(a<=checkStock.stock){
                                Cart.findOneAndUpdate({productId:req.params.id,userId:req.user.id},{$set:{quantity:a}},{new:true},(err,update) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        res.redirect('/cart/'+req.user.id);
                                    }
                                    });
                            } else {
                                req.flash('error',"You can't add more than stock" );
                                res.redirect('back');
                            }
                        } else {
                            req.flash('error',"You can't add more than stock" );
                            res.redirect('back');
                        }
                    }
                });
            }
        }
    });
});

router.post('/:id',middlewareObj.isLoggedIn , (req,res) => {
    Cart.find({productId:req.params.id,userId:req.user._id}, (err, alreadyAdded) => {
        if(err){
            console.log(err);
        } else {
            if(!(typeof alreadyAdded == 'object' && alreadyAdded.length > 0)){
                User.findById(req.user._id, (err,foundUser) => {
                    if(err){
                        console.log(err);
                    } else {
                        Item.findById(req.params.id,(err,foundItem) => {
                            if(err){
                                console.log(err);
                            } else {
                                Cart.create({userId:req.user.id,productId:req.params.id,quantity:1,
                                    name:foundItem.name,image:foundItem.image,price:foundItem.price,
                                    'author.username':foundItem.author.username,'author.image':foundItem.author.image}, (err,cartAdded) => {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        foundUser.cart.push(cartAdded);
                                        foundUser.save();
                                        res.redirect('back');
                                    }
                                });
                            }
                        })
                    }
                });
            } else {
                Item.findById(req.params.id, (err, checkStock) => {
                    if(err){
                        console.log(err);
                    } else {
                        if(alreadyAdded[0].quantity < checkStock.stock)
                        {
                            var a = alreadyAdded[0].quantity + 1;
                            Cart.findOneAndUpdate({productId:req.params.id,userId:req.user.id},{$set:{quantity:a}},{new:true},(err,update) => {
                            if(err){
                                console.log(err);
                            } else {
                                res.redirect('back');
                            }
                            });
                        } else {
                            res.redirect('back');
                        }
                    }
                });
            }
        }
    });
});


router.post('/quantity/:id',middlewareObj.isLoggedIn,(req,res) => {
    var quantity = req.body.quantity;
    Cart.findByIdAndUpdate(req.params.id, {$set:{quantity:quantity}}, {new:true}, (err,item) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/cart/' + req.user._id);
        }
    });
});

router.post('/remove/:id', middlewareObj.isLoggedIn, (req,res) => {
    Cart.findByIdAndRemove(req.params.id, (err, item) => {
        if(err){
            console.log(err);
        } else {
            User.findByIdAndUpdate(req.user.id,{$pull:{cart:req.params.id}},(err,foundUser) => {
                if(err){
                    console.log(err);
                } else {
                    res.redirect('/cart/' + req.user.id);
                }
            })
        }
    })
})

module.exports = router;