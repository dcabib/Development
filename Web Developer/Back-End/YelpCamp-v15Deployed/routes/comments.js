var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middleware = require("../middleware/") //If we just give directory name, node will automatically look for a file named "index"


//===========================================================
//Comments begin here
//===========================================================

///Add a new comment
router.get("/campgrounds/:id/comments/new" ,middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new" , {campground : campground});
        }
    });
});

router.post("/campgrounds/:id/comments" , middleware.isLoggedIn, function (req, res) {
    //lookup camppground by ID
    Campground.findById(req.params.id, function(err,campground) {
        if (err){
            console.log(err);
           res.redirect("/campgrounds");
        } else{
            //create new comment
           Comment.create(req.body.comment, function(err,comment){
               if(err){
                   req.flash("error", "Something went wrong!")
               }
               else {
                   //connect comment to campground
                   comment.author.id = req.user._id; //this is from the comment model(comments.js--comment has author and Id)
                   comment.author.username = req.user.username;
                   //console.log("New comment's username will be: " +req.user.username)
                   //save the comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   req.flash("success" , "Successfully added comment!")
                   //redirect to show page
                  res.redirect("/campgrounds/" + campground._id);
               }
           });
        }
    });
});


//========================================
//Editing comments
//========================================

router.get("/campgrounds/:id/comments/:comment_id/edit" ,middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back")
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment})
        }
    })
})


//========================================
//Updating comments
//========================================

router.put("/campgrounds/:id/comments/:comment_id/" , middleware.checkCommentOwnership, function(req, res) {
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment) {
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" +req.params.id) //campground ID
        }
    })
    
})

//========================================
//Deleting comments
//========================================


router.delete("/campgrounds/:id/comments/:comment_id/" ,middleware.checkCommentOwnership, function(req, res) {
   
    Comment.findByIdAndRemove(req.params.comment_id, function (err){
        if(err) {
        res.redirect("back") 
        } else {
             req.flash("success" , "Comment deleted")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})


module.exports = router;