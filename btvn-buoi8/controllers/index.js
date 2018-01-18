let express = require('express');
let router = express.Router();


router.get('/', (req, res) => {
  console.log(req.method.toUpperCase() + ' Request to /');
  res.render('header');
});

router.use('/login', require('./login'));

router.use('/register', require('./register'));


module.exports = router;