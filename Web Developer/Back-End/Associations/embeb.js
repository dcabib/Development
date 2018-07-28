var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model ("User", userSchema);
var Post  = mongoose.model("Post", postSchema);

// var newUser = new User ({
//     email: "super_mario@hotmail.com",
//     name: "Super Mario"
// });
//
// newUser.posts.push({
//     title: "How to bre adasdada",
//     content: "Just kidding... go to potions class to learn it"
// });




// var newPost = new Post ({
//     title: "Reflection about apples",
//     content: "Yes, they are delicious"
// });
// newPost.save(function (err, ePost) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(ePost);
//     }
// });


User.findOne({name: "Super Mario"}, function (err, fUser) {
    if (err) {
        console.log (err);
    } else {
        fUser.posts.push ({
            title: "Mais 5 coisas que eu odeio",
            content: "erro_em_codigo, jilo, palmeiras, pimenta, dor de dente"
        });

        fUser.save(function (err, sUser) {
            if (err) {
                console.log(err);
            } else {
                console.log(sUser);
            }
        });
        console.log (fUser);
    }
});
