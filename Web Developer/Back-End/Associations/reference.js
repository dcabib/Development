var mongoose = require("mongoose");
var Post = require("./models/posts");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/blog_demo2");


// User.create ({
//     email: "mario@quemario.com",
//     name: "Mario Que Mario"
// });

Post.create ({
    title: "How to cook the best burger part IV",
    content:"Mais um mais um mais um... "
}, function (err, post) {
    if (err){
        console.log (err);
    } else {
        User.findOne({email: "mario@quemario.com"}, function (err, fUser) {
            if (err) {
                console.log(err);
            } else {
                fUser.posts.push(post);
                fUser.save(function (err, data) {
                    if (err) {
                        console.log (err);
                    } else {
                        console.log(data);
                    }
                })
            }
        });
    }
});

// Find user and find all posts
//
// User.findOne({email: "mario@quemario.com"}).populate("Posts").exec(function (err, user) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(user);
//    }
// });