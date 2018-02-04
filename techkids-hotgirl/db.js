let mongodb = require('mongodb');
let configs = require('./configs');
let database;

module.exports.startMongodb = (cb) => {
  mongodb.MongoClient.connect(configs.dbURL, (err, client) => {
    if (err) {console.log(err);}
    console.log('Connect to mongodb success')
    database = client.db(configs.dbName);
    cb();
  });
};

module.exports.getCollection = (collectionName) => {
  return database.collection(collectionName);
};

