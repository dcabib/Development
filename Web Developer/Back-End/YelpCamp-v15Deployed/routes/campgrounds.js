var express = require("express");
var    router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/");
//================================
//Image upload
//================================
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'kaalebadal', 
  api_key: '597224797177457', 
  api_secret: 'NDRQ56DgQzGOmk1Z0R1HBQFj84A'
});
    

//================= 
//Show Routes
//=================

router.get("/campgrounds", function(req,res) {
    //eval(require("locus"));
    //fuzzy search starts here
    var noMatch = null;
    if(req.query.search){ //if req.query.search exists, means if someone is searching for something
        var searchTerm = new RegExp(escapeRegex(req.query.search), 'gi') //gi = global/ignore case
        Campground.find({name: searchTerm}, function(err,allCampgrounds) {
       if(err){
           console.log(err);
       } else{
           if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
       }
   });
    
    } else {
    //get all campgrounds from DB
    //console.log(req.user);
   Campground.find({}, function(err,allCampgrounds) {
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds,page:'campgrounds', noMatch: noMatch});
       }
   });
    }
});

//Add new campgound to DB
router.post("/campgrounds", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    //console.log(req.body); //the result appears once we submit data in the form
    
 cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/campgrounds/' + campground.id);
  })
});
});

//Show new form to create a new campground 

  router.get("/campgrounds/new" ,middleware.isLoggedIn, function (req, res) {
    res.render ("campgrounds/new")

});

//Show one campground with all the detail
router.get("/campgrounds/:id" , function(req, res) {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCampground)
             res.render("campgrounds/show", {campground:foundCampground});
        }
        
    })
    //show details about that campground by rendering show template
   
});


//Edit Campground details
router.get("/campgrounds/:id/edit" ,middleware.checkCampgroundOwnership, function(req, res){

    Campground.findById(req.params.id, function(err, campgroundtoedit){
            res.render("campgrounds/edit" , {campground:campgroundtoedit})
        })
    })

//Update campground details
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy  campgrounds
router.delete("/campgrounds/:id" ,middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/campgrounds")
    })
    
});

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


// //========================
// //Authentication Middelware
// //========================

// function checkCampgroundOwnership(req, res, next) {
//  if(req.isAuthenticated()){
//     //get the ID 
//     Campground.findById(req.params.id, function(err, campgroundtoedit){
//         if(err){
//             res.redirect("back")
//         } else {
//             //does user own campgrond
//             if(campgroundtoedit.author.id.equals(req.user._id)){ //cannot use "===" because lhs,which comes from mongooose, is object and rhs is string
//             //res.render("campgrounds/edit" , {campground:campgroundtoedit})
//             next();
//             }else {
//                 res.redirect("back")
//                 //res.send("You do not have the permission to do that")
//             }
//         }
//     })
//     } else {
//         console.log("you need to be signed in")
//         res.redirect("back")
//     }
// }
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
