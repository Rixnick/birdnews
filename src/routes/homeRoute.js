const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router()

router.route('/')
      .get(homeController.getIndex)

router.route('/discovers')
      .get(homeController.getDiscover);


router.route('/news')
      .get(homeController.getNews);

router.route('/news/:id')
      .get(homeController.getNewsId)

router.route('/fasts/:id')
      .get(homeController.getFastId)

router.route('/trends/:id')
      .get(homeController.getTrendId)

router.route('/blogs')
      .get(homeController.getBlogs);

router.route('/blogs/:id')
      .get(homeController.getBlogId)


router.get('/abouts', homeController.getAbout)

router.get('/contacts', homeController.getContact)
module.exports = router;