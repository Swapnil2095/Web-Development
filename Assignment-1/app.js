//console.log('From app.js');
var express = require("express");
var app = express();

// "/" 
app.get("/", function(request, response){
    response.send(" Hi there, Welcome to first assignment !! ");
});


app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    //var sound = "";
    
    var sounds ={
        
        'pig' : 'onik',
        'cow' : 'ambhaa',
        'cat' : 'meww',
        'dog' : 'bow bow',
        'crow' : 'caw caw'
        
    };
    
    
    var sound = sounds[animal];
    
    /*
    if(animal === 'pig'){
        sound = "onik";
    }else if(animal === 'cow'){
        sound = "ambhaa";
    }else if (animal === 'cat'){
        sound = "mewww";
    }*/
    
    res.send("The  " + animal + " says " + sound);
    
});
    
    
    



app.get("/repeat/:message/:times", function(req, res){

    var message = req.params.message;
    var times = Number(req.params.times);
    
    var result = "";
    for (var i = 1; i<= times; i++){
        
        result += message + "\t";
    }
    
    //res.send("Message:  " + message + " Times: " + times);
    res.send(result);
});



// "*" -> alwys put last
app.get("*", function(req, res){
    res.send("Sorry... Page not found.");
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started..");
});