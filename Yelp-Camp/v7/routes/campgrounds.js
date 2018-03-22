var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//index - show all campgrounds
router.get("/", function(req, res){
    
    // get all campgrounds
    Campground.find({}, function(err, allCampgrounds){
         if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    });
    
    
});


//create - add new campgorund to db
router.post("/", function(req, res){
    //res.render("landing");
    
    //get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    
    //create new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
         if(err){
            console.log(err);
        }
        else{
            // redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });

});

//new- show form to create new campground
router.get("/new", function(req, res){
    res.render("/new");
});


//show- show one campground 
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
