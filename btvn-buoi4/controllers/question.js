let express = require('express');
let fs = require('fs');
let mongodb = require('mongodb');
let db = require('../app');
let router = express.Router();


router.get('/get-question', (req, res) => {
	console.log('GET Request to /question/get-question');
	db.questions.find({}).toArray((err, arr) => {
		if (err) {console.log(err);}
		if (arr.length == 0) {
			res.redirect('/question/0');
		}
		else {
			let min = 0;
			let max = arr.length;
			let random = Math.floor(Math.random() * (max - min)) + min;
			res.redirect('/question/' + arr[random]._id);
		}
	});
});


router.get('/:id', (req, res) => {
	console.log('GET Request to /question/' + req.params.id);
	if (req.params.id == 0) {
		res.render('question', {no_question: 'true'});
	}
	else {
		db.questions.findOne({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
			if (err) {console.log(err);}
			let like_percent;
			let dislike_percent;
			if (result.like == 0 && result.dislike == 0) {
				like_percent = 50;
				dislike_percent = 50
			}
			else {
				like_percent = (result.like/(result.like + result.dislike)*100).toFixed(1);
				dislike_percent = (result.dislike/(result.like + result.dislike)*100).toFixed(1);
			}
			res.render('question', {no_question: 'false',
															question: result,
															like_percent: like_percent,
															dislike_percent: dislike_percent
			});
		});
	}
});


module.exports = router;