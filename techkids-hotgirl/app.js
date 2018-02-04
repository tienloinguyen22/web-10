let express = require('express');
let configs = require('./configs');
let bodyParser = require('body-parser');
let db = require('./db');
let app = express();

db.startMongodb(() => {
  app.set('view engine', 'ejs');
  app.set('views', './views');

  app.use(express.static('/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use('/', require('./controllers'));

  app.listen(configs.port, (err) => {
    if (err) {console.log(err);}
    console.log(`App listen on port ${configs.port}`);
  });

});



// imgUrl: { type: String, required: true },
// view: { type: Number, default: 0 },
// like: { type: Number, default: 0 },
// caption: { type: String, default: '' },
// userPost: { type: String, default: '' },
// timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

// email  
// password
// firstName
// lastName
// joinDate