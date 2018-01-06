let express = require('express');
let body_parser = require('body-parser');
let fs = require('fs');
let app = express();


//Middleware
app.use('/static', express.static('static'));
app.use(body_parser.urlencoded({ extended: false }));


//Setup template engine
app.set('view engine', 'ejs');
app.set('views', './views');


//Routing to /
app.get('/', (req, res) => {
    console.log('Request to /');
    res.render('index');
});

//Routing to /about
app.get('/about', (req, res) => {
    console.log('Request to /about');
    res.render('about');
});

//Routing to /ask
app.get('/ask', (req, res) => {
    console.log('Request to /ask');
    res.render('ask');
});

app.post('/ask', (req, res) => {
    console.log('POST Request to /ask');

    //Get data from database.json in to an array
    fs.readFile('./database.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) {console.log(err);}
        let db = JSON.parse(data);

        //Create a new question obj, add id, like, dislike to the question obj
        let question = req.body;
        question.id = db.length + 1;
        question.like = 0;
        question.dislike = 0;

        //Push the new question obj to database array
        db.push(question);

        //Write the new database array to .json file
        fs.writeFile('./database.json', JSON.stringify(db), (err) => {
            if (err) {console.log(err);}
        });

        //Redirect
        res.redirect('/question/' + question.id);
    });
});

//Routing to /question
app.get('/question/:id', (req, res) => {
    console.log('Request to /question/' + req.params.id);
    fs.readFile('./database.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) {console.log(err);}
        let db = JSON.parse(data);
        for (let item of db) {
            if (item.id == req.params.id) {
                res.render('question', {question: item.question, like: item.like, dislike: item.dislike, id: item.id});
                break;
            }
        }
    });
});

//Like/Dislike
app.get('/like/:id', (req, res) => {
    console.log('Click Like.');
    fs.readFile('./database.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) {console.log(err);}
        let db = JSON.parse(data);
        for (let item of db) {
            if (item.id == req.params.id) {
                item.like += 1;
                break;
            }
        }
        fs.writeFile('./database.json', JSON.stringify(db), (err) => {
            if (err) {console.log(err);}
        });
    });
    res.redirect('/question/' + req.params.id);
});

app.get('/dislike/:id', (req, res) => {
    console.log('Click Like.');
    fs.readFile('./database.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) {console.log(err);}
        let db = JSON.parse(data);
        for (let item of db) {
            if (item.id == req.params.id) {
                item.dislike += 1;
                break;
            }
        }
        fs.writeFile('./database.json', JSON.stringify(db), (err) => {
            if (err) {console.log(err);}
        });
    });
    res.redirect('/question/' + req.params.id);
});

//Random a question to show
app.get('/get-question', (req, res) => {
    fs.readFile('./database.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) {console.log(err);}
        let db = JSON.parse(data);

        let min = 1;
        let max = db.length;
        let id = Math.floor(Math.random() * (max - min + 1)) + min;

        res.redirect('/question/' + id);
    });
})



//App listen on port 8000
app.listen(8000, () => {
    console.log('Listening on port: 8000.');
});