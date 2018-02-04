let express = require('express');
let router = express.Router();



router.get('/', (req, res) => {
  res.json({mess: 'success'});
});

router.use('/posts', require('./posts'));

router.use('/users', require('./users'));



module.exports = router;