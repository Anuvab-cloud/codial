const User = require('../models/user');


module.exports.profile = async function(req, res) {
    try {
      const user = await User.findById(req.params.id).exec();
  
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
      });
    } catch (err) {
      console.error(err);
      // Handle error and send appropriate response
      return res.status(500).send('Internal Server Error');
    }
  }

// module.exports.profile = function(req, res){
//     // return res.render('user_profile', {
//     //     title: 'User Profile'
//     // })

//     if (req.cookies.user_id){
//         User.findbyIF(req.cookies.user_id, function(err, user){
//             if (user){
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user: user
//                 })
//             }
//             return res.redirect('/users/sign-in');
//         })
//     }else {
//         return res.redirect('/users/sign-in');
//     }
// }

module.exports.signUp = function(req, res){
// if (req.isAuthenticated()) {
//     return res.redirect('/users/profile');
// }

    return res.render('user_sign_up', {
        title: 'User Sign Up'
    })
}

module.exports.signIn = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'User Sign In'
    })
}

//get the sign up data
module.exports.create = async function (req, res) {
    if (req.isAuthenticated()) {

        return res.redirect('/users/profile')
    }
    if (req.body.password != req.body.confirm_password) {

        return res.redirect('back');
    }
    try {
        user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error: ", err);
        return;
    }
    }
// module.exports.create = function(req, res){
//     //authorized
//     if (req.isAuthenticated()) {

//         return res.redirect('/users/profile')
//     }

//     if(req.body.password != req.body.confirm_password) {
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){
//             console.log('error in finding user in signing up');
//             return
//         };

//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){
//                     console.log('error in creating user while signing up');
//                     return
//                 }

//                 return res.redirect('/users/sign-in');
//             })
//         } else {
//             return res.redirect('back');
//         }
//     })
// }


//sign in and create a session

module.exports.createSession = function(req, res){
    //find the user
    User.findOne({email: req.body.email}, function(err, res){
        if(err){
            console.log('error in finding user in signing in');
            return
        };

        // handle user found
        if (user) {

            //handle password not matching
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else {
            //handle user not found
            return res.redirect('back');
        }

    
    })

}

//sign in and create a session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}