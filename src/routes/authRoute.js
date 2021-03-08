const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const  authenticated = require('../middleware/auth');

router.get('/dashboard', authenticated, AuthController.get_dashboard)

router.get('/signup', AuthController.signup_get)

router.post('/signup', AuthController.signup_post)

router.get('/login', AuthController.login_get)

router.post('/login', AuthController.login_post)

router.get('/logout', AuthController.logout_get)
module.exports = router;