const Banners = require("../models/bannerModel");
const path = require('path');
const fs = require('fs');


module.exports = {
  getAllbanner: async (req, res, next) => {
    const banners = await Banners.find();
    console.log(banners)
    if (!banners) return console.log("can not fetch data from database");
    res.render("admin/banner/Banners", {
      title: "Home-Banners",
      banners: banners,
    });
  },

  getCreateBanner: async (req, res, next) => {
      res.render('admin/banner/Add', {
        title: "Create Banner"
      })
  },

  createBanner: async (req, res, next) => {
      try {
          const { index, name, types, webs, contact, expired} = req.body;
          const file = req.files.imagefile;
          // console.log(file.data)
          const fileName = new Date().getTime().toString() + path.extname(file.name)
          const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'banners', fileName);
      
          if(file.truncated){
            throw new Error('File is too big...!')
          }
          await file.mv(savePath);
          const banner = new Banners({
                  index: index,
                  name: name,
                  types: types,
                  webs: webs,
                  contact: contact,
                  expired: expired,
                  image: {
                    data: fs.readFileSync(savePath),
                    contentType: 'image/png'
                  }
                });
          await banner.save();
          res.redirect('/admin/banners');
      } catch (error) {
      console.log(error);
      res.send('Failed to sava data') 
      }
  },

  getBannerId: async (req, res, next) => {
    // res.send(req.params.id)
    const id = req.params.id;
    try {
      Banners.findById(id, function(err, banner) {
        if(err) return console.log(err)
        res.render('admin/banner/View', {
          index: banner.index,
          name: banner.name,
          types: banner.types,
          webs: banner.webs,
          contact: banner.contact,
          expired: banner.expired,
          id: banner._id
        })
      })
    } catch (error) {
      console.log(error)
    }
  },

  updateBanner: async (req, res, next) => {
    const id = req.params.id;
    await Banners.update({_id: id}, req.body)
    res.redirect('/admin/banners')
  },

  deleteBanner: async (req, res, next) => {
    const { id } = req.params;
    try {
      await Banners.remove({ _id: id })
      res.redirect('/admin/banners')
    } catch (error) {
      console.log(error)
    }
  }
};
