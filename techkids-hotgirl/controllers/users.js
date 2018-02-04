let express = require('express');
let mongodb = require('mongodb');
let bcrypt = require('bcrypt');
let configs = require('../configs');
let usersCollection = require('../db').getCollection('users');
let router = express.Router();



router.post('/', (req, res) => {
  let newUser = {};
  newUser.email = req.body.email;
  newUser.firstName = req.body.firstname;
  newUser.lastName = req.body.lastname;
  newUser.joinDate = new Date();
  
  bcrypt.hash(req.body.password, configs.saltRound, (err, hash) => {
    if (err) {
      res.json({mess: 'server err'});
    }
    newUser.password = hash;

    usersCollection.insertOne(newUser, (err, result) => {
      if (err) {
        res.json({mess: 'server err'});
      }
      res.json({
        mess: 'success',
        result: result
      });
    });
  });
});

router.get('/', (req, res) => {
  usersCollection.find({}).toArray((err, arr) => {
    if (err) {
      res.json({mess: 'server err'});
    }
    res.json({
      mess: 'success',
      result: arr
    });
  });
});

router.get('/:id', (req, res) => {
  usersCollection.findOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
    if (err) {
      res.json({mess: 'server err'});
    }
    res.json({
      mess: 'success',
      result: result
    });
  });
});

router.put('/:id', (req, res) => {
  usersCollection.updateOne(
    {_id: mongodb.ObjectID(req.params.id)},
    {$set: {
      firstName: req.body.firstname,
      lastName: req.body.lastname
    }},
    (err, result) => {
      if (err) {
        res.json({mess: 'server err'});
      }
      res.json({
        mess: 'success',
        resutl: result
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  usersCollection.deleteOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
    if (err) {
      res.json({mess: 'server err'});
    }
    res.json({
      mess: 'success',
      result: result
    });
  });
});



module.exports = router;