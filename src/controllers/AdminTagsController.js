const Tags = require('../models/tagsModel');


module.exports = {
  getTags: async (req, res, next) => {
    const tags = await Tags.find();
    console.log(tags)
    res.render('admin/tags/Tags', {
      title: "Home-Tags",
      tags: tags
    })
  },

  createTag: async(req, res, next) => {
    const { title, desc } = req.body;
    res.render('admin/tags/Add', {
      title: title,
      desc: desc
    })

    //console.log(req.body)
    try {
      const newTag = Tags(req.body);
      await newTag.save();
      res.redirect('/admin/tags')
    } catch (error) {
      res.render('admin/tags/Tags')
    }
    next();
  },

  getTagId: async(req, res, next) => {
    const id = req.params;
    await Tags.findById(id, function(err, tag){
      if(err) return console.log(err)
      res.render('admin/tags/View', {
        title: tag.title,
        desc: tag.desc,
        id: tag._id
      })
    })
  },

  updateTag: async(req, res, next) => {
    const { id } = req.params;
    try {
      await Tags.update({ _id: id}, req.body);
      res.redirect('/admin/tags')
    } catch (error) {
      console.log(error)
    }
  },


  deleteTag: async(req, res, next) => {
    const { id } = req.params;
    try {
      await Tags.remove({ _id: id})
      res.redirect('/admin/tags')
    } catch (error) {
      console.log(error)
    }
  }
}