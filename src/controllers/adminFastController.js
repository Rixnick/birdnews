const path = require('path');
const fs = require('fs');
const Fast = require('../models/fastModel');
const Category = require('../models/categoryModel');
const Tags = require('../models/tagsModel');


module.exports = {
  getAllFasts: async(req, res, next) => {
    const fast = await Fast.find();
    if(!fast) return console.log("Can not fetch data from database")
    res.render('admin/fast/Fasts', {
      title: "All News",
      fasts: fast
    })
  },

  getCreateFast: async(req, res, next) => {
    const cats = await Category.find();
    const tags = await Tags.find();
    res.render('admin/fast/Add', {
      title: "Create Fast News",
      category: cats,
      tags: tags
    })
  },
  createFast: async(req, res, next) => {
    try {
      const {title, subtitle, desc, category, tags} = req.body;
      const file = req.files.imagefile;
      const fileName = new Date().getTime().toString() + path.extname(file.name);
      const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'fast', fileName);
      if(file.truncated){
        throw new Error('File is too big...!')
      }
      await file.mv(savePath);
      const fasts = new Fast({
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
      await fasts.save();
      res.redirect('/admin/fasts')
    } catch (error) {
      console.log(error);
      res.send('Failed to save data')
    }
    next();
  },

  getFastId: async(req, res, next) => {
      const cats = await Category.find();
      const tags = await Tags.find();
      const id = req.params.id;
      Fast.findById(id, function(err, fast) {
        if(err)
          return console.log(err);
        res.render('admin/fast/Edit', {
          title: fast.title,
          subtitle: fast.subtitle,
          desc: fast.desc,
          category: cats,
          tags: tags,
          id: fast._id
        })
      })
  },

  updateFast: async(req, res, next) => {
    const {id} = req.params;
    try {
      await Fast.update({ _id: id }, req.body, {new: true});
      res.redirect('/admin/fasts')
    } catch (error) {
      console.log(error)
    }
  },

  deleteFast: async(req, res, next) => {
    const {id} = req.params;
    try {
      await Fast.remove({ _id: id });
      res.redirect('/admin/fasts')
    } catch (error) {
      console.log(error)
    }
  }
}