let express = require('express');
let cookie_parser = require('cookie-parser');
let router = express.Router();


router.use(cookie_parser());

router.get('/', (req, res) => {
  console.log(req.method.toUpperCase() + ' Request to /');
  if (req.cookies.login == 'true') {
    res.render('home', {login: 'true'});
  }
  else { res.render('home', {login: 'false'}); }
});


router.use('/logout', require('./logout'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));


module.exports = router;