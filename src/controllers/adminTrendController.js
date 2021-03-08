const path = require('path');
const fs = require('fs');
const Trends = require('../models/trendModel');
const Category = require('../models/categoryModel');
const Tags = require('../models/tagsModel');


module.exports = {
  getAllTrends: async(req, res, next) => {
    const trends = await Trends.find();
    if(!trends) return console.log("Can not fetch data from database")
    res.render('admin/trend/Trends', {
      trends: trends //display as loop on Views
    })
    next()
  },

  getCreateTrend: async(req, res, next) => {
    const cats = await Category.find();
    const tags = await Tags.find();
    res.render('admin/trend/Add', {
      title: "Create-News",
      category: cats,
      tags: tags
    })
  },
  createTrend: async(req, res, next) => {
    try {
      const {title, subtitle, desc, category, tags} = req.body;
      const file = req.files.imagefile;
      const fileName = new Date().getTime().toString() + path.extname(file.name);
      const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'trends', fileName);
      if(file.truncated){
        throw new Error('File is too big...!')
      }
      await file.mv(savePath);
      const trends = new Trends({
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
      await trends.save();
      res.redirect('/admin/trends')
    } catch (error) {
      console.log(error);
      res.send('Failed to save data')
    }
    next();
  },

  getTrendId: async(req, res, next) => {
      const cats = await Category.find();
      const tags = await Tags.find();
      const id = req.params.id;
      Trends.findById(id, function(err, trend) {
        if(err)
          return console.log(err);
        res.render('admin/trend/Edit', {
          title: trend.title,
          subtitle: trend.subtitle,
          desc: trend.desc,
          category: cats,
          tags: tags,
          id: trend._id
        })
      })
  },

  updateTrend: async(req, res, next) => {
    const {id} = req.params;
    try {
      await Trends.update({ _id: id }, req.body, {new: true});
      res.redirect('/admin/trends')
    } catch (error) {
      console.log(error)
    }
  },

  deleteTrend: async(req, res, next) => {
    const {id} = req.params;
    try {
      await Trends.remove({ _id: id });
      res.redirect('/admin/trends')
    } catch (error) {
      console.log(error)
    }
  }
}