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


//EDIT CAMPGROUND ROUTE
router.get ('/:id/edit', checkCampgroundOwnership, function (req,res){
   // check if user logged in and then check if they authored campground
   Campground.findById(req.params.id, function(err, foundCampground){
      res.render ('campgrounds/edit', {campground: foundCampground});
   });
});

// UPDATE CAMPGROUND ROUTE

router.put ('/:id', checkCampgroundOwnership, function (req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', checkCampgroundOwnership, function (req, res) {
      Campground.findByIdAndRemove(req.params.id, function(err){
          if(err){
              res.redirect('/campgrounds');
          } else {
              res.redirect('/campgrounds');
          }
      });
});

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req,res,next){
   if (req.isAuthenticated()) {
       Campground.findById(req.params.id, function(err, foundCampground){
           if (err) {
               res.redirect('back');
           } else {
               console.log(foundCampground.author.id);  // object
               console.log(req.user._id); // string
               if (foundCampground.author.id.equals(req.user._id)) {
                  console.log("author is logged in");
                  return next();
                  //next();
               } else {
                  res.redirect('back');
                  console.log('author is NOT logged in');
               }
                   
           }
       }); 
   } else {
       res.redirect('back');
   }
}


module.exports = router;
