let express = require('express');
let mongodb = require('mongodb');
let postsCollection = require('../db').getCollection('posts');
let router = express.Router();



router.post('/', (req, res) => {
  let newPost = req.body;
  newPost.createdAt = new Date();
  newPost.lastModify = new Date();

  postsCollection.insertOne(newPost, (err, result) => {
    if (err) {
      res.json({
        mess: 'create failed'
      });
    }
    if (result) {
      res.json({
        mess: 'create success'
      });
    }
  });
});

router.get('/', (req, res) => {
  postsCollection.find({}).toArray((err, arr) => {
    if (err) {
      res.json({
        mess: 'server error'
      });
    }
    res.json({
      mess: 'success', 
      result: arr
    });
  });
});

router.get('/:id', (req, res) => {
  postsCollection.findOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
    if (err) {res.json({mess: 'server err'});}
    if (result) {
      res.json({
        mess: 'success', 
        result: result
      });
    }
    else {
      res.json({
        mess: 'post doesnt exist'
      });
    }
  });
});

router.put('/:id', (req, res) => {
  postsCollection.updateOne(
    {_id: mongodb.ObjectID(req.params.id)},
    {$set: {
      caption: req.body.caption,
      lastModify: new Date()
    }}, 
    (err, result) => {
      if (err) {res.json({mess: 'server err'});}
      if (result) {
        res.json({
          mess: 'success'
        });
      }
      else {
        res.json({
          mess: 'post doesnt exist'
        });
      }
  });
});

router.delete('/:id', (req, res) => {
  postsCollection.deleteOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
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