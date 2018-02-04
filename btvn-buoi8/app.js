let express = require('express');
let mongodb = require('mongodb');
let bodyParser = require('body-parser');
let config = require('./config');
let app = express();



//Startup mongodb
mongodb.MongoClient.connect(config.dbUrl, (err, client) => {
  if (err) { console.log(err); }
  console.log('Connect to mongodb success.')
  let db = client.db(config.dbName);
  let users = db.collection('users');
  module.exports.users = users;


  //Setting template engine
  app.set('view engine', 'ejs');
  app.set('views', './views');


  //Middleware
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(require('./controllers'));


  //Start server
  app.listen(config.port, (err) => {
    if (err) { console.log(err); }
    console.log(`Listen on port ${config.port}.`);
  });
});