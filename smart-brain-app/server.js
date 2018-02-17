const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

var knex = require('knex');
var cors = require('cors');
const app = express();

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
  //console.log(data);
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{res.send(database.users);});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

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
