var express = require ("express");
var app = express();

app.get ("/", function (req, res)
{
    res.send("Hi there, welcome to my assigment!");
});

app.get ("/speak/pig", function (req, res)
{
    res.send("The pig says 'Oink'");
});

app.get ("/speak/cow", function (req, res)
{
    res.send("The cow says 'Moo'");
});


app.get ("/speak/dog", function (req, res)
{
    res.send("The dog says 'Woof Woof'");
});

app.get ("/repeat/:Message/:Number", function (req, res)
{
    var valReturn = "";

    for (var i=0; i<req.params.Number; i++)
    {
        valReturn += req.params.Message + " ";
    }
    res.send(valReturn);
});

app.get ("*", function (req, res)
{
    res.send("Sorry, page not found... what are you doing with your live");
});


app.listen("3001", "localhost");


