let express = require('express');
let about = require('./about-router');
let handlebars = require('express-handlebars');
let parser = require('body-parser').urlencoded({extended: false});
let file_upload = require('express-fileupload');
let app = express();

//Middleware
app.use(parser);
app.use(file_upload());
app.use(express.static('./static'));

//Set up template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Routing
app.get('/index', (req, res) => {
    console.log('GET Request to /index');
    res.render('index', {name: 'Bill Gate'});
});

app.post('/index', (req, res) => {
    console.log('POST Request to /index');
    if (!req.files) { 
        console.log('File not uploaded.');
    }
    else {
        console.log('Upload file: ' + req.files.photo.name);   
        req.files.photo.mv(__dirname + '/uploaded/' + req.files.photo.name, (err) => {
            if (err) {console.log(err);}
            else {console.log('Update success.');}
        });
    }
    res.redirect('/about');
});

app.use('/about', about);


//Listen on port 8000
app.listen(8000, (err) => {
    if (err) { console.log(err); }
    console.log('Server start on port 8000');
});