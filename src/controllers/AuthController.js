const bcrypt = require("bcryptjs");
const User = require('../models/userModel');
const { validateUsername, validateEmail, validatePassword } = require('../utils/isValidEmail');
const jwt = require('jsonwebtoken');



//Create Jwt Token Function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.APP_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.get_dashboard = (req, res) => {
  res.render('admin/Home', {
    title: 'Dashboard'
  })
}

module.exports.signup_get = (req, res) => {
  res.render('admin/user/Register', {
    title: 'Register User'
  })
}


//Login User Authentication
module.exports.signup_post = async (req, res) => {
  try {
    const {username, email, password, confirmpassword} = req.body;

    //Check if empty fill
    if(!username || !email || !password || !confirmpassword){
      res.status(400).json({ message: 'Please Fill all require fields...!'})
    }

    //Validat Username fiels
    const isValidUsername = validateUsername(username);
    if(!isValidUsername) {
      res.status(400).json({ message: 'Please Enter a Username'})
    }
    //Validat Email fiels
    const isValidEmail = validateEmail(email);
    if(!isValidEmail) {
      res.status(400).json({ message: 'Please Enter Valid Email'})
    }
    //Validat Password fiels
    const isValidPassword = validatePassword(password);
    if(!isValidPassword) {
      res.status(400).json({ message: 'Please must be leatst at 6 to 60 charecters'})
    }

    //check password match
    if(password !== confirmpassword) {
      res.status(400).json({ error: 'Password do not match...!'})
    }


    //Check username already exist
    const isUsername = await User.findOne({ username })
    if(isUsername) {
      res.status(400).json({ error: 'Username already in used...'})
    }


    //check email already exist
    const user = await User.findOne({email})
    if(user) {
      res.status(400).json({ error: 'Email already in used...'})
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save();

    //Create Token
    const token = createToken(newUser._id);

    //Send Token to fronten and Redirect to user dashboard
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});


    // res.status(201).json({ user: newUser._id })
    res.redirect('/admin/user/dashboard')
  } catch (error) {
    res.status(400).json({ error })
  }
}

//Login User Authentication
module.exports.login_get = (req, res) => {
  res.render('admin/user/Login', {
    title: 'Register User'
  })
}

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  try {
        //Check if empty fill
      if( !email || !password ){
        res.status(400).json({ message: 'Please Fill all require fields...!'})
      }
      const user = await User.findOne({ email });
      if(!user) {
        res.status(400).json({ message: 'Not found this email, Please signup, try again...!'})
      }


      const isPassword = await bcrypt.compare(password, user.password);
      if(!isPassword){
        res.status(400).json({ message: 'Email or Passowrd incorrect...!'})
      }

      //Create Token
      const token = createToken(user._id)
      
      //Send Token to fronten and Redirect to user dashboard
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

      res.redirect('/admin/user/dashboard')
  } catch (error) {
    res.status(400).json({ error })
  }
}


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/admin/user/login')
}