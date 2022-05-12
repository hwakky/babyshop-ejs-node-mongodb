var express = require('express');
const   Item = require('../model/itemall');
        Comment = require('../model/comment');
const Promotion = require('../model/promotion');
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

router.get('/', middlewareObj.isUser , (req,res) => {
    req.session.fromUrl = '/';
    Item.find({stock:{$gt:0}}).sort({sold:-1}).populate('comments').limit(4).exec((err, allItems) => {
        if(err){
            console.log(err);
        } else {
            Category.find({},(err,allCategory) => {
                if(err){
                    console.log(err);
                } else {
                    Promotion.find({},(err,foundPromotion) => {
                        if(err){
                            console.log(err);
                        } else {
                            res.render('home.ejs', {item: allItems,category:allCategory,promotion:foundPromotion});
                        }
                    });
                }
            });
        }
    });
})


router.get('/login', (req,res) => {
    res.render('login.ejs');
})


router.post('/login', passport.authenticate('local',
    {
        failureRedirect:'/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully log in',
        failureFlash: 'Invalid username or password'
    }), function(req,res){

        if(req.user.admin == true){
            res.redirect('/admin');
        } else {
            res.redirect(req.session.fromUrl);
        }

})

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
})

router.get('/signup', (req,res) => {
    res.render('signup.ejs');
})

router.post('/signup', function(req,res){
    
    var newUser = new User({username:req.body.username,email:req.body.email});
    if(req.body.code === 'admin'){
        newUser.admin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/signup');
        }
        passport.authenticate('local')(req,res, function(){
            req.flash('success','Sign up and login successful.')
            res.redirect('/');
        })
    })
})

router.get('/show/:id', (req,res) => {
    req.session.fromUrl = req.originalUrl;
    Item.findById(req.params.id).populate('comments').exec((err, foundItem) => {
        if(err){
            console.log(err);
        } else {
            res.render('show.ejs', {item: foundItem});
        }
    });
})


router.post('/show/:id/comments',middlewareObj.isLoggedIn, (req,res) => {
    var date = new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok'});
    Item.findById(req.params.id, (err, foundItem) => {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            Comment.create(req.body.comment, (err, comment) =>{
                if(err){
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.image = req.user.image;
                    comment.date = date;
                    comment.save();
                    foundItem.comments.push(comment);
                    foundItem.save();
                    res.redirect('/show/' + foundItem._id);
                }
            });
        }
    });
})

router.post('/comment/:id/edit', middlewareObj.checkCommentOwner, (req,res) => {
    var date = new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok'});
    Comment.findByIdAndUpdate(req.params.id, {$set:{text:req.body.text,date:date}}, {new:true}, (err,updateComment) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
})

router.post('/comment/:id/delete', middlewareObj.checkCommentOwner,(req,res) =>{
    Comment.findByIdAndRemove(req.params.id, (err,deletedComment) => {
        if(err){
            console.log(err);
        } else {
            Item.findOneAndUpdate({comments:{_id:req.params.id}},{$pull:{comments:req.params.id}},(err,deleted) => {
                if(err){
                    console.log(err);
                } else {
                    res.redirect('back');
                }
            })
        }
    })
})

router.get('/search', (req,res) => {
    req.session.fromUrl = req.originalUrl;
    var searchWord ='';
        searchCategory = '';
        Item.find({stock:{$gt:0}}).populate('comments').exec((err,foundItem) => {
        if(err){
            console.log(err);
        } else {
            Category.find({},(err,foundCategory) => {
                if(err){
                    console.log(err);
                } else {
                    res.render('search.ejs',{item:foundItem,word:searchWord,category:foundCategory,searchCategory:searchCategory});
                }
            })
        }
    })
})

router.post('/search', (req,res) => {
    var searchWord = req.body.search;
        searchCategory = '';
        Item.find({$and:[{$or:[{name:{$regex:searchWord,$options:'i'}},{category:{$regex:searchWord,$options:'i'}}]},{stock:{$gt:0}}]}).populate('comments').exec((err,foundItem) => {
        if(err){
            console.log(err);
        } else {
            Category.find({},(err,foundCategory) => {
                if(err){
                    console.log(err);
                } else {
                    res.render('search.ejs',{item:foundItem,category:foundCategory,word:searchWord,searchCategory:searchCategory});
                }
            })
        }
    })
})

router.get('/category/:type', (req,res) => {
    req.session.fromUrl = req.originalUrl;
    var searchCategory = req.params.type;
        searchWord = '';
    Item.find({category:{$regex:req.params.type,$options:'i'},stock:{$gt:0}}, (err,foundItem) => {
        if(err){
            console.log(err);
        } else {
            Category.find({},(err,foundCategory) => {
                if(err){
                    console.log(err);
                } else {
                    res.render('search.ejs',{item:foundItem,category:foundCategory,searchCategory:searchCategory,word:searchWord});
                }
            })
        }
    })
})

router.get('/seller/shop/:id',(req,res) => {
    req.session.fromUrl = req.originalUrl;
    Item.find({'author.id':req.params.id}).populate('comments').exec((err,foundItem) => {
        if(err){
            console.log(err);
        } else {
            User.findById(req.params.id,(err,foundUser) => {
                if(err){
                    console.log(err);
                } else {
                    res.render('sellerShop.ejs',{item:foundItem,user:foundUser});      
                }
            })
        }
    })
})

module.exports = router ;