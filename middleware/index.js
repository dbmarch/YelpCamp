// all the middleware
var Campground = require ('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj={};


middlewareObj.isLoggedIn = function (req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please Login First!');
    res.redirect('/login');
}


middlewareObj.checkCampgroundOwnership = function(req,res,next){

   if (req.isAuthenticated()) {
       Campground.findById(req.params.id, function(err, foundCampground){
           if (err || !foundCampground) {
               req.flash('Error', "Unable to find campground");
               res.redirect('back');
           } else {
               console.log(foundCampground.author.id);  // object
               console.log(req.user._id); // string
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                     console.log("author is logged in");
                   next();
               } else {
                  req.flash('Error', "You did not create the campground");
                  console.log('author is NOT logged in');
                  res.redirect('back');
               }
                   
           }
       }); 
   } else {
       req.flash('Error', "You need to be logged in");
       res.redirect('back');
   }
}


middlewareObj.checkCommentOwnership = function (req,res,next){
   console.log('checkCommentOwnership');

   if (req.isAuthenticated()) {
       
       console.log('user is authenticated');
       Comment.findById(req.params.comment_id, function(err, foundComment){
           if (err || !foundComment) {
               console.log("can't find comment");
               req.flash('Error', "Unable to find comment");

               res.redirect('back');
           } else {
               console.log(foundComment.author.id);  // object
               console.log(req.user._id); // string
               if (foundComment.author.id.equals(req.user._id)|| req.user.isAdmin) {
                  console.log("author is logged in");
                  next();
               } else {
                  req.flash('Error', "You did not create the comment");
                  console.log('author is NOT logged in');
                  res.redirect('back');
               }
                   
           }
       }); 
   } else {
       req.flash('Error', "You need to be logged in");
       console.log('user not logged in');
       res.redirect('back');
   }
}

module.exports = middlewareObj;
