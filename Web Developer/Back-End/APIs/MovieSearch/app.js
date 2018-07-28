var express = require ("express");
var request = require ("request");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

//app.use(bodyParser.urlencoded({extened: true}));

//
// ROUTES
//

app.get("/", function(req, res)
{
    res.render("search.ejs");
});

app.get("/results", function(req, res)
{
    console.log(req.query.moviename);
    var urlSearch = "http://www.omdbapi.com/?s=" + req.query.moviename + "&apikey=thewdb";

    request (urlSearch, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            var moviesList = JSON.parse(body);

            res.render("results.ejs", {moviesList, moviesList});
        }
        else
        {
            console.log("Page not found");
        }
    })
});

app.post("/search", function(req, res)
{
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
app.listen(3000, "localhost", function(){
    console.log ("Server started");
});
