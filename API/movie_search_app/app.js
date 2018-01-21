var express = require("express");
var request = require("request");

var app = express();

// "/" 
app.get("/results", function(req, res){
    
    console.log("results route hitted");
    request("http://www.omdbapi.com/?s=star", function(error, response, body){
        
            console.log("api request made..");

             if(!error && response.statusCode == 200){
          
                    var results = JSON.parse(body);          
                    
                    console.log(results);
                    res.send(results["Search"]);
            }

    });
});


// "*" -> alwys put last
app.get("*", function(req, res){
    res.send("You are a STAR!!");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});