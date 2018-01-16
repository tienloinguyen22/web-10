let express = require('express');
let mongodb = require('mongodb');
let app = express();


//Setting template engine
app.set('view engine', 'ejs');
app.set('views', './views');


//Middleware
app.use(express.static('public'));

//Controller
app.use(require('./controllers'));


//Config
const host = 'localhost';
const port = 8000;


//Startup mongodb and server
let url = 'mongodb://localhost:27017';
let dbName = 'web10';
let db;
let users_collection;
mongodb.MongoClient.connect(url, (err, client) => {
  if (err) { console.log(err); }

  console.log('Connect to mongodb success.')
  db = client.db(dbName);
  users_collection = db.collection('users');

  module.exports.users = users_collection;

  app.listen(port, (err) => {
    if (err) { console.log(err); }

    console.log(`Listen on port ${port}.`);
  });
});