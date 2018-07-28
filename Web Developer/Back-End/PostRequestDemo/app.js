var express = require ("express");
var app = express();

var bodyParser = require ("body-parser");

//app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extened: true}));

var friends = ["Welsner", "Celso", "Rodrigo", "Juliano"];

//
// ROUTES
//

app.get("/", function(req, res)
{
    res.render("home");
});

app.get("/friends", function(req, res)
{
    res.render("friends", {friends, friends});
});

app.post("/addfriend", function(req, res)
{
    friends.push(req.body.newfriend);
    res.redirect("/friends");
    //res.send("post route");
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
