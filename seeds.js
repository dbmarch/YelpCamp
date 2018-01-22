var Campground      = require('./models/campground');
var Comment         = require('./models/comment');

var data = [
    {
        name: 'Cloudy Camp',
        image: 'https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt dui ut ornare lectus sit amet est placerat in. Velit euismod in pellentesque massa. Et ligula ullamcorper malesuada proin libero nunc consequat. Odio facilisis mauris sit amet massa vitae tortor condimentum. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Urna porttitor rhoncus dolor purus non enim praesent elementum. Fermentum et sollicitudin ac orci phasellus egestas tellus. Nec ullamcorper sit amet risus nullam.'
    },
    {
        name: 'Camp Sun',
        image: 'https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg',
        description: 'Risus pretium quam vulputate dignissim suspendisse in. Bibendum est ultricies integer quis auctor elit sed. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Nunc id cursus metus aliquam eleifend. Ultrices eros in cursus turpis massa. Egestas dui id ornare arcu odio ut sem nulla pharetra. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Porttitor rhoncus dolor purus non enim praesent elementum. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Mauris nunc congue nisi vitae.'
    },
    {
        name: 'Tent City',
        image: 'https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg',
        description: "LArcu cursus vitae congue mauris rhoncus aenean. Faucibus a pellentesque sit amet porttitor eget. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Consectetur libero id faucibus nisl tincidunt eget nullam. Molestie nunc non blandit massa enim nec dui. Diam phasellus vestibulum lorem sed risus ultricies tristique. In ante metus dictum at. Scelerisque in dictum non consectetur a erat nam at lectus. At erat pellentesque adipiscing commodo. Sed id semper risus in hendrerit. Massa eget egestas purus viverra accumsan. Malesuada fames ac turpis egestas maecenas pharetra convallis. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Accumsan tortor posuere ac ut. Dictum at tempor commodo ullamcorper a lacus vestibulum. Mauris augue neque gravida in fermentum et."
    }
]    ;

function seedDB () {
    
    // Remove all campgrounds
    Campground.remove( {}, function(err) {
        if(err) console.log(err);
        console.log('removed campgrounds ');

//             // Add campgrounds
//         data.forEach(function(seed) {
//             Campground.create(seed, function(err,campground){
//                 if(err) console.log(err);
//                 else {
//                   console.log('added campground');
//                   Comment.create(
//                       {
//                           text: 'this is a great place, i wish there was internet',
//                           author: 'homer'
//                       }, function(err, comment){
//                           if(err) {
//                               console.log(err);
//                           } else {
//                               try{
//                                   console.log (campground._id)
// //                                campground.comments.push(comment._id)                                  
// //                                campground.save()
//                                   Campground.findOneAndUpdate(
//                                       {_id: campground._id},
//                                       {$push: {comments: comment}},
//                                       function(){
//                                           console.log("created new comment");
//                                       }
//                                     );
//                               }catch(e){
//                                     console.log(e.message);
//                             }
//                           }
//                       });
//                 }
//             });

//         });
    
    });
}

module.exports = seedDB;