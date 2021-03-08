const Category = require('../models/categoryModel');


module.exports = {
  getAllCategory: async (req, res, next) => {
    const categories = await Category.find();

    if(!categories) return console.log("can not fetch data")

    res.render('admin/cates/Category', {
      categories: categories
    })
  },

  createCategory: async (req, res, next) => {
    var title = "";
    var desc = "";
    res.render('admin/cates/Add', {
      title: title,
      desc: desc
    });
    try {
      const newCat = Category(req.body);
      // console.log("Cat", newCat)
      await newCat.save();
      // console.log("result", category)
      res.redirect('/admin/cats')
    } catch (error) {
      res.render('admin/cates/Category')
    }
    next()
  },

  getByCatId: async (req, res, next) => {
    const id = req.params.id;
    // console.log("result:", id)
    await Category.findById(id, function(err, category) {
      if(err)
        return console.log(err)
      res.render('admin/cates/Edit', {
        title: category.title,
        desc: category.desc,
        id: category._id
      })
    })
  },

  updateCate: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Category.update({_id: id}, req.body);
      res.redirect('/admin/cats');
    } catch (error) {
      console.log(error)
    }
  },

  deleteCate: async(req, res, next) => {
    const { id } = req.params;
    try {
      await Category.remove({ _id: id })
      res.redirect('/admin/cats')
    } catch (error) {
      console.log(error)
    }
  }
}