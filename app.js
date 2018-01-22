var express     = require ( 'express' ),
//request         = require('request'),
bodyParser      = require('body-parser'),
mongoose        = require('mongoose'),
Campground      = require('./models/campground'),
Comment         = require('./models/comment'),
User            = require('./models/user'),
app             = express(),
passport        = require('passport'),
LocalStrategy   = require('passport-local'),
seedDB          = require('./seeds');

var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');


mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.Promise = global.Promise;

app.use (express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended: true } ) ) ;

//seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Once again Rusty wins cutest dog',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use (function (req,res,next) {
    res.locals.currentUser = req.user;
    next();
});

//Landing Page
app.get ('/', function(req,res) {
    res.render('landing');
});

app.use (indexRoutes);
app.use ('/campgrounds/:id/comments', commentRoutes);
app.use ('/campgrounds', campgroundRoutes);

app.listen('8080', '0.0.0.0', function() {
    console.log('YelpCamp has started');
});


