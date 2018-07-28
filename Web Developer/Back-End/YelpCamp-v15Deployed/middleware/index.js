var Campground = require("../models/campground")
var Comment = require("../models/comment")

//all middleware goes here

var middlewareObj ={}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
 if(req.isAuthenticated()){
    //get the ID 
    Campground.findById(req.params.id, function(err, campgroundtoedit){
        if(err){
            res.redirect("back")
        } else {
            //does user own campgrond
            if(campgroundtoedit.author.id.equals(req.user._id)){ //cannot use "===" because lhs,which comes from mongooose, is object and rhs is string
            //res.render("campgrounds/edit" , {campground:campgroundtoedit})
            next();
            }else {
                req.flash("error" , "You do not have the permission to do that!")
                res.redirect("back")
                //res.send("You do not have the permission to do that")
            }
        }
    })
    } else {
        req.flash ("error", "you need to be signed in to do that!")
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
 if(req.isAuthenticated()){
    //get the ID 
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        } else {
            //does user own comment
            if(foundComment.author.id.equals(req.user._id)){ //cannot use "===" because lhs,which comes from mongooose, is object and rhs is string
            next();
            } else {
                req.flash("error" , "You don't have the permission to do that!")
                res.redirect("back")
            }
        }
    })
    } else {
        req.flash("error" , "You have to be logged in to do that!")
        console.log("you need to be signed in")
        res.redirect("back")
    }
}


middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error" , "Yo have to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;
