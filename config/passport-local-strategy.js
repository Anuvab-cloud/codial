const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function(email, password, done){
    try{
      const user = await  User.findOne({email: email}); 
      if (!user || user.password != password){
        console.log('Invalid Username/Password');
        return done(null, false);
    }
    return done(null, user);
    }
    
    
        catch (err){
            console.log('Error in finding the user');
            return done(err);
        }


}


));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err){
            console.log('Error in finding user in deserialization');
            return done(err);
        }

        return done(null, user);
    });
});



//check if the user is authinticated
passport.checkAuthentication = function(req, res, next) {
    //if the suer is signed-in, ten pass on request to next function(controller action)
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        //req.user contains the curr signed in user from the cookie and we are just senting them to locals for the views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;