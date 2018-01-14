let express = require('express');
let mongodb = require('mongodb')
let app = express();


//Setup template engine
app.set('view engine', 'ejs');
app.set('views', './views');


//Middleware
app.use(express.static('public'));
app.use(require('./controllers'));


//Start mongodb and server
let url = 'mongodb://localhost:27017';
let database;
let questions;
mongodb.MongoClient.connect(url, (err, client) => {
  if (err) {console.log(err);}
	console.log('Connect to mongodb success.');
	
	database = client.db('voting-app');
	questions = database.collection('questions');
	module.exports.db = database;
	module.exports.questions = questions;
	
	app.listen(8000, () => {
		console.log('Listening on port: 8000.');
	});
});


