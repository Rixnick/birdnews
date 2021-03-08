const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

//Controller
const FastController = require('../controllers/adminFastController');

router.route('/')
      .get(authenticated, FastController.getAllFasts)

router.route('/add-fast')
      .get(authenticated, FastController.getCreateFast)

router.route('/add-fast')
      .post(authenticated, FastController.createFast)


router.route('/view/:id')
      .get(authenticated, FastController.getFastId)

router.route('/edit/:id')
      .post(authenticated, FastController.updateFast)

router.route('/delete/:id')
      .get(authenticated, FastController.deleteFast)

module.exports = router;