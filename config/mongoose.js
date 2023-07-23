//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/passport_auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  

//acquire connection to check if its successful
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error on db'));

db.once('open', function() {
    console.log('Successfully connected to db');
})