var express = require('express'),
    router = express.Router(),
    mw = require('../middleware'),
    Campground = require ('../models/campground');

// Campground Routes
router.get ('/', function(req,res) {
    // Get all the campgrounds

    //console.log(req.user);
    
    Campground.find({}, function(err,allCampgrounds){
        if(err) {
            console.log(err);
            req.flash('Error', "Error adding to the database");

        } else {
            res.render('campgrounds/index', {campgrounds:allCampgrounds});
        }
    });
});

// CREATE 
router.post ('/', mw.isLoggedIn, function(req,res) {
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
            req.flash('Error', "Error adding to the database");
            console.log("error adding to database");
        } else {
            req.flash ('success', 'Campground Created');
            res.redirect('/campgrounds');
        }
    });
    
});

// NEW
router.get ('/new', mw.isLoggedIn, function(req,res) {
   res.render('campgrounds/new') ;
});


// SHOW
router.get ('/:id', function(req,res){
    // find the campground with the provided ID
    // render show template with that campground
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
            req.flash('Error', "Unable to find campground");

        }else {
            console.log(foundCampground);
            res.render ('campgrounds/show', {campground:foundCampground});
        }
    } )
})


//EDIT CAMPGROUND ROUTE
router.get ('/:id/edit', mw.checkCampgroundOwnership, function (req,res){
   // check if user logged in and then check if they authored campground
   Campground.findById(req.params.id, function(err, foundCampground){
      res.render ('campgrounds/edit', {campground: foundCampground});
   });
});

// UPDATE CAMPGROUND ROUTE

router.put ('/:id', mw.checkCampgroundOwnership, function (req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash('Error', "Unable to find campground");
            res.redirect('/campgrounds');
        } else {
            req.flash ('success', 'Campground Updated');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', mw.checkCampgroundOwnership, function (req, res) {
      Campground.findByIdAndRemove(req.params.id, function(err){
          if(err){
             req.flash('Error', "Unable to find campground");
              res.redirect('/campgrounds');
          } else {
              req.flash ('success', 'Campground Removed');
              res.redirect('/campgrounds');
          }
      });
});



module.exports = router;
