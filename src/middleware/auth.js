
const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    //Check jwt token exist & is verified
    if(token){
        jwt.verify(token, process.env.APP_SECRET, (error, decodedToken)=> {
            if(error) {
              console.log(error.message)
              res.redirect('/admin/user/login')
            }else{
              console.log('Decoded Info:',decodedToken)
              next();
            }
        })
    }else{
      res.redirect('/admin/user/login')
    }
}

module.exports = authenticated;