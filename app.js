const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      User = require('./model/user'),
      LocalStrategy = require('passport-local'),
      Comment = require('./model/comment'),
      Item = require('./model/itemall'),
      seedDB = require('./seeds');
      middlewareObj = require('./middleware');
      alert = require('alert');
      methodOverride = require('method-override');
      flash = require('connect-flash');
      

const app = express();

var indexRoutes = require('./routes/index');
    cartRoutes = require('./routes/cart');
    sellerRoutes = require('./routes/seller');
    adminRoutes = require('./routes/admin');
    userRoutes = require('./routes/user');

const option = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
mongoose.connect('mongodb://localhost:27017/project',option);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extend:true}));
app.set('view engine','ejs');
app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

app.use('/', indexRoutes);
app.use('/cart',middlewareObj.isUser, cartRoutes);
app.use('/seller',middlewareObj.isUser, sellerRoutes);
app.use('/admin',middlewareObj.isAdmin, adminRoutes);
app.use('/user',middlewareObj.isUser,middlewareObj.isLoggedIn, userRoutes);

app.listen('3000',() => {
    console.log('Server is Running!');
})