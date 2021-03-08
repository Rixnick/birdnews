const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

const AdminBannerController = require('../controllers/AdminBannerController');
// const upload = require('../middleware/multer');
const Banners = require("../models/bannerModel");

router.route('/')
      .get( authenticated, AdminBannerController.getAllbanner);

      
router.route('/get-add-banner')
      .get( authenticated, AdminBannerController.getCreateBanner);


router.route('/add-banner')
      .post( authenticated, AdminBannerController.createBanner);


router.route('/view/:id')
      .get( authenticated, AdminBannerController.getBannerId);


router.route('/update-banner/:id')
      .post( authenticated, AdminBannerController.updateBanner);


router.route('/delete-banner/:id')
      .get( authenticated, AdminBannerController.deleteBanner)

module.exports = router;