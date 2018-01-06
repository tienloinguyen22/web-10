let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    console.log('Request to /about');
    res.end('About page.');
});

module.exports = router;