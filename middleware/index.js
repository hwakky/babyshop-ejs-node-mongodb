var Item = require('../model/itemall');

var middlewareObj = [];

middlewareObj.checkItemOwner = (req, res, next) => {
    if(req.isAuthenticated()){
        Item.findById(req.params.id, (err,foundItem) => {
            if(err){
                req.flash('error','Product not found');
                res.redirect('back');
            } else {
                if(foundItem.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error',"You don't have permission");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error','You need to login first.');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.id, (err,foundComment) => {
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.admin == true){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error','You need to login first.');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to login first.');
    res.redirect('/login');
}

middlewareObj.isAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.admin == true){
            return next();
        } else{
            res.redirect('back');
        }
    } else {
        res.redirect('/login');
    }
}

middlewareObj.isUser = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.admin == false){
            return next();
        } else {
            res.redirect('/admin');
        }
    }
    else {
        return next();
    }
}

module.exports = middlewareObj;