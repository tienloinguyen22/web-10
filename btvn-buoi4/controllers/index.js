let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	console.log('GET Request to /');
	res.render('home');
});

router.get('/about', (req, res) => {
	console.log('GET Request to /about');
	res.render('about');
});

router.use('/ask', require('./ask'));
router.use('/question', require('./question'));
router.use('/vote', require('./vote'));

module.exports = router;