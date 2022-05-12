const express   = require('express'),
      app       = express(),
      bodyParser        = require('body-parser'),
      mongoose  = require('mongoose'),
      passport  = require('passport'),
      LocalStrategy     = require('passport-local'),
      User      = require('./model/user'),
      flash     = require('connect-flash'),
      methodOverride    = require('method-override'),
      seedDB    = require('./seeds'),
      middlewareObj     = require('./middleware');
    
// const option = {
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// }
const indexRoutes = require('./routes/index'),
      cartRoutes = require('./routes/cart'),
      sellerRoutes = require('./routes/seller'),
      adminRoutes = require('./routes/admin'),
      userRoutes = require('./routes/user');

mongoose.connect('mongodb://localhost/Hwak');
app.set("view engine","ejs");
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(flash());

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

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})
seedDB();


// declare route
app.use('/', indexRoutes);
app.use('/cart',middlewareObj.isUser, cartRoutes);
app.use('/seller',middlewareObj.isUser, sellerRoutes);
app.use('/admin',middlewareObj.isAdmin, adminRoutes);
app.use('/user',middlewareObj.isUser,middlewareObj.isLoggedIn, userRoutes);

// check connection
app.listen('3000',() => {
    console.log('Activated');
})