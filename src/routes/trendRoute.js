const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

//Controller
const TrendController = require('../controllers/adminTrendController');

router.route('/')
      .get(authenticated, TrendController.getAllTrends)

router.route('/add-trend')
      .get(authenticated, TrendController.getCreateTrend)

router.route('/add-trend')
      .post(authenticated, TrendController.createTrend)


router.route('/view/:id')
      .get(authenticated, TrendController.getTrendId)

router.route('/edit/:id')
      .post(authenticated, TrendController.updateTrend)

router.route('/delete/:id')
      .get(authenticated, TrendController.deleteTrend)

module.exports = router;