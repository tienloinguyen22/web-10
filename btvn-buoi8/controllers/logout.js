let express = require('express');
let cookie_parser = require('cookie-parser');
let router = express.Router();

router.use(cookie_parser());

router.get('/', (req, res) => {
  res.cookie('login', 'false');
  console.log('Log out ok.');
  res.redirect('/');
});

module.exports = router;