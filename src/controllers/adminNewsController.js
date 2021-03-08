const path = require('path');
const fs = require('fs');
const News = require('../models/newsModel');
const Category = require('../models/categoryModel');
const Tags = require('../models/tagsModel');


module.exports = {
  getAllNews: async(req, res, next) => {
    const news = await News.find();
    if(!news) return console.log("Can not fetch data from database")
    res.render('admin/news/News', {
      news: news //display as loop on Views
    })
    next()
  },

  getCreateNews: async(req, res, next) => {
    const cats = await Category.find();
    const tags = await Tags.find();
    res.render('admin/news/Add', {
      title: "Create-News",
      category: cats,
      tags: tags
    })
  },
  createNews: async(req, res, next) => {
    try {
      const {title, subtitle, desc, category, tags} = req.body;
      const file = req.files.imagefile;
      const fileName = new Date().getTime().toString() + path.extname(file.name);
      const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'news', fileName);
      if(file.truncated){
        throw new Error('File is too big...!')
      }
      await file.mv(savePath);
      const news = new News({
        title: title,
        subtitle: subtitle,
        desc: desc,
        category: category,
        tags: tags,
        image: {
          data: fs.readFileSync(savePath),
          contentType: 'image/png'
        }
      })
      await news.save();
      res.redirect('/admin/news')
    } catch (error) {
      console.log(error);
      res.send('Failed to save data')
    }
    next();
  },

  getNewsId: async(req, res, next) => {
      const cats = await Category.find();
      const tags = await Tags.find();
      const id = req.params.id;
      News.findById(id, function(err, newsinfo) {
        if(err)
          return console.log(err);
        res.render('admin/news/Edit', {
          title: newsinfo.title,
          subtitle: newsinfo.subtitle,
          desc: newsinfo.desc,
          category: cats,
          tags: tags,
          id: newsinfo._id
        })
      })
  },

  updateNews: async(req, res, next) => {
    const {id} = req.params;
    try {
      await News.update({ _id: id }, req.body, {new: true});
      res.redirect('/admin/news')
    } catch (error) {
      console.log(error)
    }
  },

  deleteNews: async(req, res, next) => {
    const {id} = req.params;
    try {
      await News.remove({ _id: id });
      res.redirect('/admin/news')
    } catch (error) {
      console.log(error)
    }
  }
}