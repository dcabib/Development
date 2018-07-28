var express = require ("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

//
// ROUTES
//

app.get("/", function(req, res)
{
    res.render("home");
});

app.get("/fallinginlovewith/:thing", function(req, res)
{
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res)
{
    var allPosts = [{title: "Post1", author: "Mario"}, {title: "My addorable pad", author: "Joana"}, {title: "O Cara eh o autor", author: "Daniel"}];
    res.render("posts", {posts: allPosts});
});



// Defaul message for non-defined ROUTE
app.get("/*", function(req, res)
{
    res.send ("Page not found");
});

//
// Tell Express to listen for request
//
app.listen(3001, "localhost", function(){
    console.log ("Server started");
});
