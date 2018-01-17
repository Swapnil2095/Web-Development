//console.log('From app.js');
var express = require("express");
var app = express();

// "/" -> hi
app.get("/", function(request, response){
    response.send("Hi there!!");
});

// "/bye" -> goodby
app.get("/bye", function(request, response){
    response.send("Good Bye!!");
});

// "/doggs" -> bow bow

app.get("/dog", function(request, response){
    console.log("route /dog accessed");
    response.send("Bow Bow!!");
});


//sub-route
app.get("/r/:subredditName", function(req, res){
    //console.log(req.params);
    var subredditName = req.params.subredditName;
    res.send("You are in " + subredditName.toUpperCase() + " sub-route!!");
});

app.get("/r/:subredditName/comment/:id/:title", function(req, res){
    console.log(req.params);
    res.send("You are in sub-route comment/title!!");
});


// "*" -> alwys put last
app.get("*", function(req, res){
    res.send("You are a STAR!!");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});