var mongoose    = require('mongoose');

var campgroundSchema =  new mongoose.Schema({
    name:String,
    price:String,
    created: String,
    location: String,
    lat: Number,
    lng: Number,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},  { usePushEach: true });

module.exports = mongoose.model('Campground', campgroundSchema);
