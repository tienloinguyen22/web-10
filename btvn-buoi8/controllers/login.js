let express = require('express');
let body_parser = require('body-parser');
let cookie_parser = require('cookie-parser');
let db = require('../app');
let bcrypt = require('bcrypt');
let router = express.Router();

router.use(body_parser.urlencoded({extended: false}));
router.use(cookie_parser());

router.use((req, res, next) => {
  console.log(req.method.toUpperCase() + ' Request to /login');
  next();
});

router.get('/', (req, res) => {
  if (req.cookies.login == 'true') {
    res.render('login', {login: 'true'});
  }
  else { res.render('login', {login: false}); }
});

router.post('/', (req, res) => {
  db.users.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }

    if (result) {
      bcrypt.compare(req.body.password, result.password, (err, resu) => {
        if (err) { console.log(err); }
        
        if (resu == true) {
          res.cookie('login', 'true');
          console.log('Log in success.');
          res.end('login success');
        }
        else if (resu == false) {
          res.end('wrong password');
        }
      });
    }
    else {
      res.end('email doesnt exist');
    }
  });
});


module.exports = router;
