const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

//Controller
const Newscontroller = require('../controllers/adminNewsController');

router.route('/')
      .get(authenticated, Newscontroller.getAllNews)

router.route('/add-news')
      .get(authenticated, Newscontroller.getCreateNews)

router.route('/add-news')
      .post(authenticated, Newscontroller.createNews)


router.route('/view/:id')
      .get(authenticated, Newscontroller.getNewsId)

router.route('/edit/:id')
      .post(authenticated, Newscontroller.updateNews)

router.route('/delete/:id')
      .get(authenticated, Newscontroller.deleteNews)

module.exports = router;