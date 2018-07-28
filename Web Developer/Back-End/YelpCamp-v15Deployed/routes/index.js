var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



//================= 
//Root Routes
//=================
router.get("/" , function(req, res){
    res.render("landing");
});


//=======================================
// Auth Routes
//=======================================


router.get("/register" , function(req, res){
    res.render("register",{page:'register'});
});

//=====================================
//Sign Up Routes
//=====================================
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
             req.flash("error" , err.message) //error from passport like password empty or username allready taken. This is an object. So we use err.message to choose the messages/
            return res.redirect("/register");
        }
         passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});


//=====================================
//Login Routes
//=====================================

router.get("/login", function(req, res) {
    res.render("login" , {page:'login'});
});


router.post("/login" , passport.authenticate("local" , {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: 'Invalid username or password'
    }), function(req, res){
        
});

//=====================================
//Logout Routes
//=====================================

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success" , "Logged you out")
    res.redirect("/campgrounds");
});




module.exports = router;