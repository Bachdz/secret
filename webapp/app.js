const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config({path: __dirname + '/.env'});



const { PORT = 3000,
    NODE_ENV = 'development',
    SESS_NAME= 'sid',
    EIGHT_HOURS= 1000 * 60 * 60 * 8,
    SESS_LIFETIME = EIGHT_HOURS,
    SESS_SECRET = '!tsSe2creatIAV?DevOp/!',

} = process.env;

const IN_PROD = NODE_ENV === 'production';

const app = express();

// const PORT = process.env.PORT || 5000;

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite : true,
        secure: IN_PROD
    }

}));

//Bodyparser
app.use(express.urlencoded({
    extended: false
}));


app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));

// Make static uses
app.use(express.static(__dirname + '/public'));


app.use('/upload-new-case',express.static(__dirname + '/public'));
app.use('/upload-new-case/preview',express.static(__dirname + '/public'));
app.use('/upload-new-case/preview/push',express.static(__dirname + '/public'));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// parse application/json
app.use(bodyParser.json());



app.listen(PORT, console.log(`Server started on PORT ${PORT}`));