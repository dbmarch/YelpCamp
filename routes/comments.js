var express = require('express'),
    router = express.Router({mergeParams: true}),
    Campground = require ('../models/campground'),
    Comment  = require ('../models/comment');


// ================================================
//  COMMENTS 
// ========================================
router.get ('/new', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
})


router.post ('/', isLoggedIn, function (req, res) {
    // look up campground using id
    //create comment
    // connect comment
    // redirect to campground show page
    
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err) 
            res.redirect('/campgrounds');
        }else{
           console.log (req.body.comment);
           Comment.create (req.body.comment, function (err, comment) {
               if (err) {
                   console.log(err);
               }else{
                //   console.log(comment._id);
                //   console.log('new comment username will be: '+ req.user.username);

                   comment.author.id      = req.user._id;
                   comment.author.username=req.user.username;
                   comment.save();
                   
                   campground.comments.push(comment._id);
                   campground.save();
                   console.log(comment);
                   res.redirect('/campgrounds/'+campground._id)
               }
           })
        }
    })
});


function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;