let express = require('express');
let usersCollection = require('../app').users;
let router = express.Router();


router.use((req, res, next) => {
  console.log(req.method.toUpperCase() + ' Request to /login');
  next();
});

router.get('/', (req, res) => {
  res.render('login', {email: '',
                       emailErr: false,
                       username: '',
                       usernameErr: false});
});

router.post('/', (req, res) => {
  usersCollection.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }
    if (result) {
      if (req.body.username == result.username) {
        res.end('Login success.')
      }
      else {
        res.render('login', {email: req.body.email,
                             emailErr: false,
                             username: req.body.username,
                             usernameErr: true
        });
      }
    }
    else {
      res.render('login', {email: req.body.email,
                           emailErr: true,
                           username: req.body.username,
                           usernameErr: false
      });
    }
  });
});


module.exports = router;
