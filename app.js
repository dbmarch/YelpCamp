var express     = require ( 'express' ),
//request         = require('request'),
bodyParser      = require('body-parser'),
morgan          = require('morgan'),
mongoose        = require('mongoose'),
methodOverride  = require('method-override'),
flash           = require('connect-flash'),
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
app.use (methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended: true } ) ) ;
app.use (flash());

app.use(morgan('combined'));
morgan(':remote-addr :method :url :uuid');


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

morgan(function (req, res) {
      return req.method + ' ' + req.url + ' ' + req.uuid;
    });
    
// This caches the currently logged in user.
app.use (function (req,res,next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success=req.flash('success');
    next();
});

//Landing Page
app.get ('/', function(req,res) {
    res.render('landing');
});

app.use ('/', indexRoutes);
app.use ('/campgrounds', campgroundRoutes);
app.use ('/campgrounds/:id/comments', commentRoutes);


app.listen('8080', '0.0.0.0', function() {
    console.log('YelpCamp has started');
});


