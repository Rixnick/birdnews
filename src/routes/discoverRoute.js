const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

const discoverController = require('../controllers/adminDiscoverController');



router.route('/')
      .get(authenticated, discoverController.getAllDiscovers);

router.route('/get-add-discover')
      .get(authenticated, discoverController.getAddDiscover)

router.route('/add-discover')
      .post(authenticated, discoverController.createDiscover);

router.route('/view/:id')
      .get(authenticated, discoverController.getDiscoverId);

router.route('/edit/:id')
      .post(authenticated, discoverController.updateDiscover);



router.route('/delete/:id')
      .get(authenticated, discoverController.deleteDiscover);

module.exports = router;