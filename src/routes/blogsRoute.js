const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth');

const adminBlogController = require('../controllers/adminBlogController');
// const uploads = require('../middleware/Multer');


router.route('/')
      .get( authenticated, adminBlogController.getBlogs)

router.route('/add-blog')
      .get( authenticated, adminBlogController.getCreateBlog)


router.route('/add-blog')
      .post(authenticated, adminBlogController.createBlog)

      
router.route('/view/:id')
      .get(authenticated, adminBlogController.getBlogId)

router.route('/edit/:id')
      .post(authenticated, adminBlogController.updateBlog)

router.route('/delete/:id')
      .get(authenticated, adminBlogController.deleteBlog)

      

module.exports = router;