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

//EDITE
router.get ('/:comment_id/edit', function(req,res){
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect ('back');
            console.log(err)
        } else {
            res.render ('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
});


// UPDATE
router.put('/:comment_id', function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
        if(err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id );
            // res.redirect('/:' + req.params.id);
        }
    });
})



// DESTROY
router.delete ('/:comment_id', function (req,res) {
    console.log ('delete comment');
    
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
          if(err){
              res.redirect('back');
          } else {
              res.redirect('/campgrounds/'+req.params.id);
          }
    })
})

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;