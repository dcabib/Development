var express = require ("express");
var app = express();

//
// ROUTES
//

app.get("/", function(req, res) 
{
	res.send ("Hi there");
});

app.get("/bye", function(req, res)
{
    res.send ("Goodbay");
});


app.get("/dog", function(req, res)
{
    res.send ("MEAW");
    console.log ("Someone made a request to /dog");
});

// Pattern for routes
app.get("/r/:subName", function(req, res)
{
    res.send ("Welcome to subedit");
});

// Defaul message for non-defined ROUTE
app.get("/*", function(req, res)
{
    res.send ("You are a STAR");
});


//
// Tell Express to listen for request
//
app.listen(3000, "localhost", function(){
	console.log ("Server started");
});
