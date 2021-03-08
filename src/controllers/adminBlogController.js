const path = require('path');
const fs = require('fs');
const Blogs = require('../models/blogModel');


module.exports = {
  getBlogs: async(req, res, next) => {
    const blogs = await Blogs.find();
    if(!blogs) return console.log("can not fetch blogs data");
    res.render('admin/blogs/Blogs', {
      title: "Blogs-Home",
      blogs: blogs
    })
    next();
  },

  getCreateBlog: async (req, res, next) => {
    res.render('admin/blogs/Add', {
      title: 'Create-Blog'
    })
  },


  createBlog: async(req, res, next) => {
    try {
      const {title, subtitle, desc, category, tag} = req.body;
      const file = req.files.imagefile;
      const fileName = new Date().getTime().toString() + path.extname(file.name);
      const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'blogs', fileName);

      if(file.truncated) {
        throw new Error('File is too big...!')
      }
      await file.mv(savePath);
      const blogs = new Blogs({
        title: title,
        subtitle: subtitle,
        desc: desc,
        category: category,
        tag: tag,
        image: {
          data: fs.readFileSync(savePath),
          contentType: 'image/png'
        }
      })
      await blogs.save();
      res.redirect('/admin/blogs');
    } catch (error) {
      console.log(error);
      res.send('Failed to save data...!') 
    }
  },

  getBlogId: async(req, res, next) => {
    const id = req.params.id;
    try {
      Blogs.findById(id, function(err, blog) {
        if(err) return console.log(err)
        res.render('admin/blogs/View', {
          title: blog.title,
          subtitle: blog.subtitle,
          desc: blog.desc,
          category: blog.category,
          tag: blog.tag,
          id: blog._id
        })
      })
    } catch (error) {
      return console.log(error)
    }
  },

  updateBlog: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Blogs.update({ _id: id }, req.body);
      res.redirect('/admin/blogs')
    } catch (error) {
      console.log(error)
    } 
  },

  deleteBlog: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Blog.remove({ _id: id});
      res.redirect('/admin/blogs')
    } catch (error) {
      console.log(error)
    }
  }
}