let express = require('express');
let body_parser = require('body-parser');
let cookie_parser = require('cookie-parser');
let bcrypt = require('bcrypt');
let db = require('../app');
let router = express.Router();

const saltRound = 10;

router.use(cookie_parser());
router.use(body_parser.urlencoded({extended: false}));

router.use((req, res, next) => {
  console.log(req.method.toUpperCase() + ' Request to /register');
  next();
});

router.get('/', (req, res) => {
  if (req.cookies.login == 'true') {
    res.render('register', {login: 'true'});
  }
  else { res.render('register', {login: 'false'}); }
});

router.post('/', (req, res) => {
  db.users.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }

    if (result) {
      res.end('email exist');
    }
    else {
      let new_user = {};
      new_user.email = req.body.email;
      new_user.f_name = req.body.f_name.toLowerCase();
      new_user.l_name = req.body.l_name.toLowerCase();

      bcrypt.hash(req.body.password, saltRound, (err, hash) => {
        if (err) { console.log(err); }
    
        new_user.password = hash;
        db.users.insertOne(new_user, (error, resu) => {
          if (error) { console.log(error); }
    
          console.log(resu.ops[0]);
          console.log('Register success.');
          res.end('register success');
        });
      });
    }
  });
});

router.get('/check/:email', (req, res) => {
  db.users.findOne({email: req.params.email}, (err, result) => {
    if (err) { console.log(err); }

    if (result) {
      res.end('not ok');
    }
    else { res.end('ok'); }
  });
});


module.exports = router;