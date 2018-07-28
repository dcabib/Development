// Include Libraries
var express     = require("express");
var bodyParser  = require("body-parser");
var mongoose    = require ("mongoose");

var app = express();

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//
// Mongoose / Model Schema config
//
var blogSchema = new mongoose.Schema ({
    title: String,
    image: String,
    body:  String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model ("Blog", blogSchema);


//
// RESTful Routes
//
//

// Default Route (root route) to /blogs
app.get("/", function (req, res) {
    res.redirect("/blogs");
});


// INDEX Route
app.get("/blogs", function (req, res) {

    //getting blogs data from datase
    Blog.find({}, function (err, dataBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index.ejs", {blogs:dataBlogs});
        }
    })
});

//
// Execute the web server
app.listen("3000", "localhost", function ()
{
    console.log("Server is running");
});

