let express = require('express');
let fs = require('fs');
let body_parser = require('body-parser');
let db = require('../app');
let router = express.Router();

router.use(body_parser.urlencoded({extended: false}));

router.use((req, res, next) => {
	console.log(req.method.toUpperCase() + ' Request to /ask');
	next();
});

router.get('/', (req, res) => {
	res.render('ask');
});

router.post('/', (req, res) => {
	let new_question = req.body;
	new_question.like = 0;
	new_question.dislike = 0;

	db.questions.insertOne(new_question, (err, result) => {
		if (err) {console.log(err);}
		console.log(result.ops[0]);
		res.redirect('/question/' + result.ops[0]._id);
	});
});

module.exports = router;