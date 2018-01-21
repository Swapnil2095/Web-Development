
var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public")); 

// "/" 
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    
    var campgrounds =[
            {name : "Sunset", image : "http://www.photosforclass.com/download/882244782"},
            {name : "Cloud 9", image : "http://www.photosforclass.com/download/882244782"},
            {name : "Summer Rest", image : "http://www.photosforclass.com/download/882244782"},
            {name : "Night fall", image : "http://www.photosforclass.com/download/882244782"},
            {name : "Beautiful Senary", image : "http://www.photosforclass.com/download/882244782"}
        ];
    
    res.render("campgrounds", {campgrounds : campgrounds});
});


app.post("/campgrounds", function(req, res){
    res.render("landing");
});


// "*" -> alwys put last
app.get("*", function(req, res){
    res.send("You are a STAR!!");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});