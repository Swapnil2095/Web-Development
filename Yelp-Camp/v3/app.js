var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public")); 
//seedDB();

        
// "/" 
app.get("/", function(req, res){
    res.render("landing");
});

//index - show all campgrounds
app.get("/campgrounds", function(req, res){
    
    // get all campgrounds
    Campground.find({}, function(err, allCampgrounds){
         if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds : allCampgrounds});
        }
    });
    
    
});


//create - add new campgorund to db
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


//show- show one campground 
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});


// "*" -> always put last
app.get("*", function(req, res){
    res.send("You are a STAR!!");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});