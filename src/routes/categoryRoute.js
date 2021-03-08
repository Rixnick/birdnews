const express = require('express');
const router = express.Router();
const  authenticated = require('../middleware/auth');

const CategoryController = require('../controllers/adminCatsController');



router.route('/')
      .get( authenticated, CategoryController.getAllCategory);


router.route('/add-cate')
      .get( authenticated, CategoryController.createCategory);


router.route('/add-cate')
      .post( authenticated, CategoryController.createCategory);


router.route('/edit-cate/:id')
      .get(authenticated, CategoryController.getByCatId);


router.route('/edit-cate/:id')
      .post(authenticated, CategoryController.updateCate);
      

router.route('/delete-cate/:id')
      .get(authenticated, CategoryController.deleteCate);

module.exports = router;