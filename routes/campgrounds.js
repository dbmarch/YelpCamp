var express = require('express'),
    router = express.Router(),
    Campground = require ('../models/campground');

// Campground Routes
router.get ('/', function(req,res) {
    // Get all the campgrounds

    //console.log(req.user);
    
    Campground.find({}, function(err,allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds:allCampgrounds});
        }
    });
});

// CREATE 
router.post ('/', isLoggedIn, function(req,res) {
    // get data from form and add to campground array
    // redirect back to campgrounds page.
    
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground= {name: name, image:image, description:desc, author: author};
    // campgrounds.push(newCampground);
 
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log("error adding to database");
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});

// NEW
router.get ('/new', isLoggedIn, function(req,res) {
   res.render('campgrounds/new') ;
});


// SHOW
router.get ('/:id', function(req,res){
    // find the campground with the provided ID
    // render show template with that campground
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        }else {
            console.log(foundCampground);
            res.render ('campgrounds/show', {campground:foundCampground});
        }
    } )
})

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
