// Import Libraries
var express               = require ("express");
var bodyParser            = require ("body-parser");
var mongoose              = require ("mongoose");
var passport              = require ("passport");
var LocalStrategy         = require ("passport-local");
var passportLocalMongoose = require ("passport-local-mongoose");

// Local Libraries
var seedDB                = require ("./seeds");
var Campground            = require ("./models/campground");
var Comment               = require ("./models/comment");
var User                  = require ("./models/user");

// Define Application Server
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Connect to MongoDB Database
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

// Clean up Database
seedDB();

// ==========================
// PASSPORT CONFIGURATION
// ==========================
app.use(require("express-session")(
    {
        secret: "Essa eh uma frase de criacao de sessoes...",
        resave: false,
        saveUninitialized: false
    }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==========================
// CAMPGROUNDS ROUTES
// ==========================

app.get("/", function (req, res)
{
    res.render("landing.ejs");
});

// NEW Route - show the form to submit a new campground
app.get ("/campgrounds/new", function (req, res)
{
    res.render("campgrounds/new.ejs");
});

// SHOW Route - Show info about one specifict Campground
app.get("/campgrounds/:id", function (req, res)
{
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show.ejs", {campground:foundCampground});
        }
    });
});

// INDEX Route - Show all Campground
app.get("/campgrounds", function (req, res)
{
    // get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
        }
    });
});

// CREATE Route - Create a new Campground
app.post("/campgrounds", function (req, res)
{
    var newCampground = {name: req.body.name, img:req.body.img, desc:req.body.desc};

    // Create a new campgroud and save to Database
    Campground.create(newCampground, function (err, newCampgroudAdded)
    {
        if (err) {
            console.log(err);
        }
        else
        {
            // redirect back to /campgrounds
            //res.redirect("/campgrounds");
        }
    })
});

// ==========================
// COMMENTS ROUTES
// ==========================

app.get ("/campgrounds/:id/comments/new", isLoggedIn, function (req, res)
{
    // find campground by ID
    Campground.findById(req.params.id, function (err, campground)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res)
{
  // Lookuo campground using ID

    Campground.findById(req.params.id, function (err, campground)
    {
        if (err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            // Create new comment
            Comment.create (req.body.comments, function (err, comment)
            {
                if (err)
                {
                    console.log.err(err);
                }
                else
                {
                    // Connect new comment to campgroud
                    campground.comments.push(comment);
                    campground.save();

                    // Redirect to show page
                    res.redirect("/campgrounds/" + campground._id);

                }
            });
        }
    });
});

// ==========================
// AUTH ROUTES
// ==========================

// Form for sign up
app.get("/register", function(req, res)
{
    console.log("Passei");

    res.render("register.ejs");
});

// Handeling user sing up
app.post("/register", function(req, res)
{
    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function (err)
    {
        if (err)
        {
            console.log(err);
            return res.render('register');
        }
        else
        {
            passport.authenticate("local")(req, res, function ()
            {
                res.redirect("/campgrounds");
            });
        }
    });
});

// =================
// LOGIN ROUTES
// =================

// Render login form
app.get("/login", function(req, res)
{
    res.render("login.ejs");
});

// Handeling logic with middleware
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res)
{
    req.logout();
    res.redirect("/campgrounds");
});

// Middleware for authentication
function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()){
        console.log ("Not autheticated");
        return next();
    }
    else
    {
        console.log ("Autheticated");
        res.redirect("/login");
    }
};


// ===========
// DEFAULT ROUTE -- ERROR PAGE NOT FOUNT
// ===========

app.get("/*", function (req, res)
{
    res.send("Page not found");
});


app.listen("3000", "localhost", function ()
{
    console.log("Server started");
});
