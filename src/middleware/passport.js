const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Import User Model
const User = require('../models/userModel');

// const passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   async ( email, password, done) => {
//     User.findOne({ email: email }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));



 module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ email: 'email'}, (email, password, done) => {
      //Match User
      User.findOne({ email: email })
          .then(user => {
            if(!user) {
              return done(null, false, { message: 'This email is not register, yet'})
            }

            //match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if(err) throw err;

              if(isMatch) {
                return done(null, user)
              }else {
                return done(null, false, { message: 'password incorrect'})
              }
            })
          })
          .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}









// function initialize(passport) {
//   const authenticateUser = async (email, password, done) => {
//       const user = await User.findOne({ email: email });
//       if(user == null) {
//         return done(null, false, {
//           message: "No User with that email, plz register"
//         })
//       }

//       try {
//         if( await bcrypt.compare(password, user.password)) {
//           return done(null, user)
//         }else{
//           return done(null, false, {
//             message: "Password Incorrect"
//           })
//         }
//       } catch (error) {
//         return done(error )
//       }
//   }


//   passport.use(new LocalStrategy({ usernameField: email}), authenticateUser)
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user);
//     });
//   });
// }


// module.exports = initialize;