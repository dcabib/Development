var express         = require("express"),
        app         = express(),
        bodyparser  = require("body-parser"),
        passport    = require("passport"),
        LocalStrategy= require("passport-local"),
        methodOverride = require("method-override"),
        mongoose    = require("mongoose"),
        flash       = require("connect-flash"),
        Campground  = require("./models/campground"),
        seedDB      = require("./seeds"),
        Comment     = require("./models/comment"),
        User        = require("./models/user");

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
        
//seedDB(); //seed the DB
mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true})
//mongoose.connect("mongodb://camper:password@ds133776.mlab.com:33776/vt_yelpcamp", {useMongoClient: true});

app.use(bodyparser.urlencoded({extended:true}));
app.set ("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

//Passport Configurations
app.use(require("express-session")({
    secret: "I got my Hogwarts letter",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    //we're storing currentUser on res.locals, it's available to us in all of the views rendered during any request.
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use ("/", indexRoutes);
app.use (campgroundRoutes);
app.use (commentRoutes);


//listening
app.listen(3001,"localhost", function(){
    console.log("The Yelp Camp server has started");
} );