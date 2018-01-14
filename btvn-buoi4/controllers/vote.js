let express = require('express');
let fs = require('fs');
let db = require('../app');
let mongodb = require('mongodb');
let router = express.Router();

router.get('/:vote/:id', (req, res) => {
	console.log(req.params.vote.toUpperCase());
	db.questions.findOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
		if (err) {console.log(err);}
		if (req.params.vote == 'like') {
			let newlike = result.like + 1;
			let newdislike = result.dislike;
			db.questions.updateOne({_id: mongodb.ObjectID(req.params.id)}, {$set: {like: newlike}}, (err, resu) => {
				if (err) {console.log(err);}
				console.log(resu.result);
				res.end(newlike + ' ' + newdislike);
			});
		}
		else if (req.params.vote == 'dislike') {
			let newlike = result.like;
			let newdislike = result.dislike + 1;
			db.questions.updateOne({_id: mongodb.ObjectID(req.params.id)}, {$set: {dislike: newdislike}}, (err, resu) => {
				if (err) {console.log(err);}
				console.log(resu.result);
				res.end(newlike + ' ' + newdislike);
			});
		}
	});
});

module.exports = router;