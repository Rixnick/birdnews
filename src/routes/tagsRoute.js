const express = require('express');
const router = express.Router();
const  authenticated = require('../middleware/auth');


const AdminTagsController = require('../controllers/AdminTagsController');

router.route('/')
      .get(authenticated, AdminTagsController.getTags)

router.route('/add-tag')
      .get(authenticated, AdminTagsController.createTag)

router.route('/add-tag')
      .post(authenticated, AdminTagsController.createTag)

router.route('/edit/:id')
      .get(authenticated, AdminTagsController.getTagId);

router.route('/edit/:id')
      .post(authenticated, AdminTagsController.updateTag);

router.route('/delete/:id')
      .get(authenticated, AdminTagsController.deleteTag)

module.exports = router