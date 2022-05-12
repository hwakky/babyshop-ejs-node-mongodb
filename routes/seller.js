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



router.get('/new',middlewareObj.isLoggedIn, (req,res) =>{
    res.render('new.ejs');
})

router.post('/', middlewareObj.isLoggedIn, upload.single('image'), (req ,res) => {
    var date = new Date().toLocaleString('en-US',{timeZone:'Asia/Bangkok'});
    req.body.item.image = '/uploads/' + req.file.filename;
    req.body.item.author = {
        id : req.user._id,
        username : req.user.username,
        image : req.user.image
    }
    req.body.item.sold = 0;
    req.body.item.date = date;
        Item.create(req.body.item, (err, newItemCreated) => {
            if(err){
                console.log(err);
                req.flash('error',err.message)
            } else{
                req.flash('success','New product added')
                res.redirect('/seller');
            }
        })

})

router.get('/',middlewareObj.isLoggedIn,(req,res) => {
    Item.find({'author.id':req.user.id}).populate('comments').exec((err,allItem) => {
        if(err){
            console.log(err);
        } else {
            res.render('seller.ejs',{item:allItem});
        }
    });
})

router.get('/edit/:id',middlewareObj.isLoggedIn, middlewareObj.checkItemOwner,(req,res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        if(err){
            console.log(err);
        } else {
            res.render('edit.ejs', {item: foundItem});
        }
    });
})

router.put('/edit/:id', middlewareObj.isLoggedIn, upload.single('image'), (req,res) => {
    if(req.file){
        req.body.item.image = '/uploads/' + req.file.filename;
    }
    Item.findByIdAndUpdate(req.params.id, req.body.item, (err,foundItem) => {
            if(err){
                console.log(err);
            } else {
                req.flash('success', foundItem.name + ' has been changed');
                res.redirect('/seller');
            }
    });
})

router.post('/delete/:id', middlewareObj.isLoggedIn,middlewareObj.checkItemOwner,(req,res) => {
    Item.findByIdAndRemove(req.params.id, (err,removeItem) => {
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Product has been removed')
            res.redirect('/seller');
        }
    })
})

module.exports = router;