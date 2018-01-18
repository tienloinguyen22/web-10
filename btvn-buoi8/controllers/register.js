let express = require('express');
let usersCollection = require('../app').users;
let router = express.Router();


router.use((req, res, next) => {
  console.log(req.method.toUpperCase() + ' Request to /register');
  next();
});

router.get('/', (req, res) => {
  res.render('register', {email: '',
                          emailErr: false,
                          emailEmpty: false,
                          username: '',
                          usernameErr: false,
                          usernameEmpty: false,
                          rememberEmpty: false, 
  });
});

router.post('/', (req, res) => {
  let emailEmpty = !req.body.email;
  let usernameEmpty = !req.body.username;
  let rememberEmpty = !req.body.remember;
  let emailErr = false;
  let usernameErr = false;

  usersCollection.findOne({email: req.body.email}, (err, result) => {
    if (err) { console.log(err); }
    if (result) {
      console.log(result);
      emailErr = true;
    }
    usersCollection.findOne({username: req.body.username}, (err, resu) => {
      if (err) {console.log(err);}
      if (resu) {
        console.log(resu);
        usernameErr = true;
      }
      console.log(emailEmpty, usernameEmpty, rememberEmpty, emailErr, usernameErr);
      if (emailEmpty || usernameEmpty || rememberEmpty || emailErr || usernameErr) {
        res.render('register', {email: req.body.email,
                                emailErr: emailErr,
                                emailEmpty: emailEmpty,
                                username: req.body.username,
                                usernameErr: usernameErr,
                                usernameEmpty: usernameEmpty,
                                rememberEmpty: rememberEmpty, 
        });
      }
      else {
        let newUser = {};
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        usersCollection.insertOne(newUser, (err, resul) => {
          if (err) {console.log(err);}
          console.log(resul.ops[0]);
        });
        res.end('Register success.');
      }
    });
  });
});

router.get('/email/:email', (req, res) => {
  usersCollection.findOne({email: req.params.email}, (err, result) => {
    if (err) {console.log(err);}
    if (result) {
      res.send('exist');
    }
    else { 
      res.send('availble'); 
    }
  });
});

router.get('/username/:username', (req, res) => {
  usersCollection.findOne({username: req.params.username}, (err, result) => {
    if (err) {console.log(err);}
    if (result) {
      res.send('exist');
    }
    else { 
      res.send('availble'); 
    }
  });
});


module.exports = router;