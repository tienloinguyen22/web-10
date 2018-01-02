let express = require('express');
let app = express();

//Some settings
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', './views');

//Routing to /index
app.get('/index', (req, res) => {
    console.log('Request received.');
    res.render('index', {name: 'Tien Loi'});
    res.end();
});

//Routing to /about
app.get('/about', (req, res) => {
    console.log('Request received.');
    res.render('about', {});
    res.end();
});

//App listen on port 8000
app.listen(8000, () => {
    console.log('Listening on port: 8000.');
});