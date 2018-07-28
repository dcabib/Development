var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
    
    var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "I am not a killer. I'm really more an apartment person. Oh I beg to differ, I think we have a lot to discuss. After all, you are a client. Finding a needle in a haystack isn't hard when every straw is computerized.Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. He taught me a code. To survive. I feel like a jigsaw puzzle missing a piece. And I'm not even sure what the picture should be.Like a sloth. I can do that. I'm thinking two circus clowns dancing. You? I'm thinking two circus clowns dancing. You? Oh I beg to differ, I think we have a lot to discuss. After all, you are a client."
    },
    {
        name: "Desert Mesa", 
        image: "http://www.samsaradechu.com/images/bg/the_camp/camp/2.jpg",
        description: "I am not a killer. I'm really more an apartment person. Oh I beg to differ, I think we have a lot to discuss. After all, you are a client. Finding a needle in a haystack isn't hard when every straw is computerized.Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. He taught me a code. To survive. I feel like a jigsaw puzzle missing a piece. And I'm not even sure what the picture should be.Like a sloth. I can do that. I'm thinking two circus clowns dancing. You? I'm thinking two circus clowns dancing. You? Oh I beg to differ, I think we have a lot to discuss. After all, you are a client."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "I am not a killer. I'm really more an apartment person. Oh I beg to differ, I think we have a lot to discuss. After all, you are a client. Finding a needle in a haystack isn't hard when every straw is computerized.Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. He taught me a code. To survive. I feel like a jigsaw puzzle missing a piece. And I'm not even sure what the picture should be.Like a sloth. I can do that. I'm thinking two circus clowns dancing. You? I'm thinking two circus clowns dancing. You? Oh I beg to differ, I think we have a lot to discuss. After all, you are a client."
    }
]

    
    function seedDB() {
        Campground.remove({} , function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Campgrounds destroyed!!")
            }
            //add a few campgrounds
            //     data.forEach(function(seed){
            //         Campground.create (seed, function(err, campground){
            //             if(err){
            //                 console.log(err)
            //             } else{
            //                 console.log("campground created!")
            //                 Comment.create({
            //                     text: "This place is great. But I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err,comment){
            //                     if (err) {
            //                         console.log(err)
            //                     }else {
            //                         campground.comments.push(comment)
            //                         campground.save();
                                    
            //                     }
                                
                                
            //                 })
            //             }
            //         })
            //   })
        })
        
    }
    
    
    
    
    //add a few comments
    
    module.exports = seedDB;
    
    
    
// we have to add the add campground part as a part of the 
// remove campground function only to make sure that first everything is removed and 
// then new camps are added. 
// When we do it seperately, there is no garuntee that removalwil happen first and then creation. 
// In the video, when Colt ran his code, all the campgrounds were first created then destroyed.