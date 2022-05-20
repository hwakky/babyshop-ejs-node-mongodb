
const   express = require('express');
        Item = require('../model/itemall');
        Category = require('../model/category');
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

router.get('/', function(req,res) {
    res.render('Admin.ejs')
})

router.get('/user', (req,res) => {
    User.find({admin : false}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if(req.user.masterAdmin == true){
                User.find({admin : true,masterAdmin:{$ne: true}},function(err,foundAdmin){
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

router.post('/user/delete/:id', function(req,res){
    User.findByIdAndRemove(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/user');
        }
    });
})

router.get('/info/:id', function(req,res){
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        } else {
            res.render('adminUserInfo.ejs',{user:foundUser});
        }
    })
})

router.post('/info/edit/:id',upload.single('image'),function(req,res){
    if(req.file){
        req.body.user.image = '/uploads/' + req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err,updateUser){
            if(err){
                console.log(err);
            } else {
                res.redirect('/admin/user');
            }
    });
})

router.get('/product', function(req,res){
    Item.find({},function(err,foundItem){
        if(err){
            console.log(err);
        } else {
            res.render('adminProduct.ejs',{item:foundItem});
        }
    })
})

router.post('/product/delete/:id',function(req,res){
    Item.findByIdAndRemove(req.params.id,function(err,deletedItem){
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/product');
        }
    })
})

router.get('/product/:id', function(req,res){
    Item.findById(req.params.id).populate('comments').exec(function(err,foundItem){
        if(err) {
            console.log(err);
        } else {
            res.render('adminProductAndComment.ejs',{item:foundItem});
        }
    })
})
module.exports = router;