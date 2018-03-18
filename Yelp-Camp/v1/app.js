
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

    var campgrounds =[
            {name : "Sunset", image : "https://innatcedarfalls.com/wp-content/uploads/2016/02/hocking-hills-camping.jpg"},
            {name : "Cloud 9", image : "https://cdn.vox-cdn.com/thumbor/TK1PUJn0DMe-xfZqp4yU5aPtMto=/0x271:5225x3210/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
            {name : "Summer Rest", image : "http://az616578.vo.msecnd.net/files/2017/04/02/636267040556445779-1013014465_camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
            {name : "Night fall", image : "http://3.bp.blogspot.com/-EZslw2DfT5E/VFEMGzI_XYI/AAAAAAAAFuk/U-S7ouns-1A/s1600/Camping-In-Iceland-National-Park-Hd-Wallpaper-.jpg"},
        {name : "Sunset", image : "https://innatcedarfalls.com/wp-content/uploads/2016/02/hocking-hills-camping.jpg"},
            {name : "Cloud 9", image : "https://cdn.vox-cdn.com/thumbor/TK1PUJn0DMe-xfZqp4yU5aPtMto=/0x271:5225x3210/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/54137641/camping_tents.0.jpg"},
            {name : "Summer Rest", image : "http://az616578.vo.msecnd.net/files/2017/04/02/636267040556445779-1013014465_camping-voyageurs-national-park-tent.jpg.rend.tccom.1280.960.jpeg"},
            {name : "Night fall", image : "http://3.bp.blogspot.com/-EZslw2DfT5E/VFEMGzI_XYI/AAAAAAAAFuk/U-S7ouns-1A/s1600/Camping-In-Iceland-National-Park-Hd-Wallpaper-.jpg"}

];
        
// "/" 
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    

    
    res.render("campgrounds", {campgrounds : campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    //res.render("landing");
    
    //get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image};
    
    //add new data to campground array
    campgrounds.push(newCampground);
    
    // redirect to campgrounds page
    res.redirect("/campgrounds");
    
    
    
    
});


// "*" -> alwys put last
app.get("*", function(req, res){
    res.send("You are a STAR!!");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});