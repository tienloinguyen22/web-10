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
  let emailErr = false;
  let usernameErr = false;

  usersCollection.findOne({email: req.body.email}, (err, result) => {
    if (err) {console.log(err);}
    if (result) {
      if (req.body.username == result.username) {
        res.end('Login success.')
      }
      else {
        usernameErr = true;
        res.render('login', {email: req.body.email,
                             emailErr: emailErr,
                             username: req.body.username,
                             usernameErr: usernameErr
        });
      }
    }
    else {
      emailErr = true;
      res.render('login', {email: req.body.email,
                           emailErr: emailErr,
                           username: req.body.username,
                           usernameErr: usernameErr
      });
    }
  });
});


module.exports = router;
