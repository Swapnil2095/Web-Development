const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
//const knex = require("knex");
var knex = require('knex');
var cors = require('cors');
const app = express();
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //locahost
    user : 'postgres',
    password : 'swapnil',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});



const database = {
    users: [
      {
          id: '123',
          name: 'swapnil',
          email: 'swapnil@gmail.com',
          password: 'pwd',
          entries: 0,
          joined: new Date()
      },
      {
        id: '124',
        name: 'nil',
        email: 'nil@gmail.com',
        password: 'pass',
        entries: 0,
        joined: new Date()
    }
  ],
  login: [
    {
      id: '123',
      hash: '',
      email: 'swapnil@gmail.com'
    }
  ]
}
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
  //console.log("getting root");
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  //res.json("sing-in");

  hash = "$2a$10$3sbwe4o.Ubg53Hb4sDOB2OjTmQZUDEYC2PKKMQr0M1lFG5/RexqVW"
  // Load hash from your password DB.
  bcrypt.compare("pwd", hash, function(err, res) {
      // res == true
      console.log("first res :" + res);

  });
  bcrypt.compare("veggies", hash, function(err, res) {
      // res = false
      console.log("second res :" + res);
  });

  console.log(req.body);
  if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
    res.json(database.users[0]);
  }else {
    res.status(400).json("error loggin in..");
  }

});

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  bcrypt.hash( password, null, null, function(err, hash) {
      // Store hash in your password DB.
      console.log(hash);
  });
    database.users.push({
      id: '125',
      name: name,
      email: email,
      //password: password,
      entries: 0,
      joined: new Date()
  });

  res.json(database.users[database.users.length-1]);
});


app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      return res.json(user);
    }
  })

    if(!found){
      res.status(404).json("no such user found..");
    }

});

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id){
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })

  if(!found){
    res.status(404).json("no such user found..");
  }

});







app.listen(3000, () => {
  console.log("App is running on Port 3000..");
});

/*


/ -> res = this is working
/signin -> post = success/fail
/register -> post = user
/profile/:userId -> get = user
/image -> put -> updated user


*/
