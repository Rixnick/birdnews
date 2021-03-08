const path = require('path');
const fs = require('fs');

const Discover = require('../models/discoverModel');


module.exports = {
  getAllDiscovers: async(req, res, next) => {
    const discovers = await Discover.find();
    if(!discovers) return console.log("Can not fetch Data from database...!");
    res.render('admin/discover/Discovers', {
      title: "Discovers-Home",
      discovers: discovers
    })
    next();
  },

  getAddDiscover: async (req, res, next) => {
    res.render('admin/discover/Add', {
      title: 'Create-discover'
    })
  },

  createDiscover: async(req, res, next) => {
    try {
      const {title, desc, tags } = req.body;
      const file = req.files.imagefile;
      const fileName = new Date().getTime().toString() + path.extname(file.name);
      const savePath = path.join(__dirname, '../', '../', 'public', 'uploads', 'discovers', fileName);

      if(file.truncated) {
        throw new Error('File is too big...!')
      }
      await file.mv(savePath);
      const discovers = new Discover({
        title: title,
        desc: desc,
        tags: tags,
        image: {
          data: fs.readFileSync(savePath),
          contentType: 'image/png'
        }
      })
      // console.log(discovers)
      await discovers.save();
      res.redirect('/admin/discovers')
    } catch (error) {
      console.log(error);
      res.send('Failed to save data...!') 
    }
  },

  getDiscoverId: async (req, res, next) => {
    const id = req.params.id;
    try {
      Discover.findById(id, function(err, discover){
        res.render('admin/discover/View', {
          title: discover.title,
          desc: discover.desc,
          tags: discover.tags,
          id: discover._id
        })
      })
    } catch (error) {
      return console.log(error)
    }
  },

  updateDiscover: async(req, res, next) => {
    const { id } = req.params;
    try {
      await Discover.update({ _id : id}, req.body);
      res.redirect('/admin/discovers')
    } catch (error) {
      console.log(error)
    }
  },

  deleteDiscover: async(req, res, next) => {
    const { id } = req.params;
    try {
      await Discover.remove({ _id : id});
      res.redirect('/admin/discovers')
    } catch (error) {
      console.log(error)
    }
  }
}