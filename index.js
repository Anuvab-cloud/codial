const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session coolie in db
app.use(session({
    name: 'codial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: "mongodb://127.0.0.1/"
        },
        {
            mongooseConnection: db,
            autoRemove: 'disabled'    
        },
        function(err){
            console.log(err || 'connect-mongodb setup is ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes'));

//  app.get('/', function(req, res){
//      // res.send('Cool it is running!');
//      return res.render('home');
//  })

//  app.get('/', function(req, res){
//       res.send('Cool it is running!');
//      return res.render('user_sign_up');
//  })

//   app.get('/profile', function(req, res){
//      res.send('Cool it is running in Profile!');
//   })

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log('Error' , err);
    }

    console.log('Server is up and running on port' , port);
})