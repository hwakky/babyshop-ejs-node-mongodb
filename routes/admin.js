var express = require('express');
const   Item = require('../model/itemall');
        Category = require('../model/category');
        Promotion = require('../model/promotion');
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

router.get('/', (req,res) => {
    Item.find().sort({sold:-1}).limit(4).exec((err, allItems) => {
        if(err){
            console.log(err);
        } else {
            Category.find({}, (err,allCategory) => {
                if(err){
                    console.log(err);
                } else {
                    Promotion.find({},(err,foundPromotion) => {
                        if(err){
                            console.log(err);
                        } else {
                            res.render('homeAdmin.ejs', {item: allItems,category:allCategory,promotion:foundPromotion});
                        }
                    });
                }
            });
        }
    });
})

router.get('/category', (req,res) => {
    Category.find({}, (err,foundCategory) => {
       if(err){
           console.log(err);
       } else {
           res.render('adminCategory.ejs',{category:foundCategory});
       }
    });
})

router.post('/category/add',upload.single('image'), (req,res) => {
    if(req.file){
        req.body.category.image = '/uploads/' + req.file.filename;
    }
    Category.create(req.body.category, (err,newCategory) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/category');
        }
    })
})

router.post('/category/delete/:id', (req,res) => {
    Category.findByIdAndRemove(req.params.id, (err,removedCategory) => {
       if(err){
           console.log(err);
       } else {
           res.redirect('/admin/category');
       }
    });
})

router.get('/user', (req,res) => {
    User.find({admin : false}, (err, foundUser) => {
        if(err){
            console.log(err);
        } else {
            if(req.user.masterAdmin == true){
                User.find({admin : true,masterAdmin:{$ne: true}},(err,foundAdmin) => {
                    if(err){
                        console.log(err);
                    } else {
                        res.render('adminUser.ejs',{user:foundUser,admin:foundAdmin});
                    }
                })
            } else {
                res.render('adminUser.ejs',{user:foundUser});
            }
        }
    })
})

router.post('/user/delete/:id', (req,res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/user');
        }
    });
})

router.post('/user/promote/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id,{$set:{admin:true}}, (err, user) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/user');
        }
    });
})

router.post('/user/downgrade/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id,{$set:{admin:false}}, (err, user) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/user');
        }
    });
})

router.get('/info/:id', (req,res) => {
    User.findById(req.params.id, (err,foundUser) => {
        if(err){
            console.log(err);
        } else {
            res.render('adminInfo.ejs',{user:foundUser});
        }
    })
})

router.post('/info/edit/:id',upload.single('image'),(req,res) => {
    if(req.file){
        req.body.user.image = '/uploads/' + req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, req.body.user, (err,updateUser) => {
            if(err){
                console.log(err);
            } else {
                res.redirect('/admin/user');
            }
    });
})

router.get('/promotion', (req,res) => {
    Promotion.find({},(err,foundPromotion) => {
       if(err){
           console.log(err);
       } else {
           res.render('adminPromotion.ejs',{promotion:foundPromotion});
       }
    });
})

router.post('/promotion/add', upload.single('image'), (req,res) => {
    var image = '/uploads/' + req.file.filename;
    Promotion.create({image:image}, (err,newPromotion) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/promotion');
        }
    })
    
})

router.post('/promotion/delete/:id', (req,res) => {
    Promotion.findByIdAndRemove(req.params.id, (err,removedPromotion) => {
       if(err){
           console.log(err);
       } else {
           res.redirect('/admin/promotion');
       }
    });
})

router.get('/product', (req,res) => {
    Item.find({},(err,foundItem) => {
        if(err){
            console.log(err);
        } else {
            res.render('adminProduct.ejs',{item:foundItem});
        }
    })
})

router.post('/product/delete/:id',(req,res) => {
    Item.findByIdAndRemove(req.params.id,(err,deletedItem) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/product');
        }
    })
})

router.get('/product/:id', (req,res) => {
    Item.findById(req.params.id).populate('comments').exec((err,foundItem) => {
        if(err) {
            console.log(err);
        } else {
            res.render('adminProductAndComment.ejs',{item:foundItem});
        }
    })
})
module.exports = router;