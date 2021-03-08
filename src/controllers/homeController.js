const News = require('../models/newsModel');
const Blog = require('../models/blogModel');
const Fasts = require('../models/fastModel');
const Trends = require('../models/trendModel');
const Category = require('../models/categoryModel');
const Tags = require('../models/tagsModel');
const Banners = require('../models/bannerModel');



module.exports = {
  getIndex: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners2 = await Banners.findOne({"index": "2"})
    const banners3 = await Banners.findOne({"index": "3"})
    const banners4 = await Banners.findOne({"index": "4"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    
    const newsindex = await News.findOne();
    const news = await News.find();
    const fastnews = await Fasts.find();
    const trends = await Trends.find();
    if(!news) return console.log("can not fetch data from database...!")
    res.render('client/Index', {
      title: 'Home-News',
      news: news,
      newsindex: newsindex, 
      banners1: banners1,
      banners2: banners2,
      banners3: banners3,
      banners4: banners4,
      banners5: banners5,
      banners6: banners6,
      fastnews: fastnews,
      trends: trends
    })
    console.log("banners1", banners1)
  },

  getDiscover: async (req, res, next) => {
    res.render('client/Discover')
  },


  getNews: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    const banners7 = await Banners.findOne({"index": "7"})
    const news = await News.find();
    if(!news) return console.log("can not fetch data from database...!")
    res.render('client/News', {
      tittle: 'Home-News',
      news: news,
      banners1: banners1,
      banners5: banners5,
      banners6: banners6,
      banners7: banners7
    })
  },

  getNewsId: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"});
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"});
    const banners7 = await Banners.findOne({"index": "7"})
    const id = req.params.id;
    // res.send(id)
    try {
      News.findById(id, function(err, newinfo) {
        if(err) return console.log(err);
        res.render('client/NewsId', {
          title: newinfo.title,
          subtitle: newinfo.subtitle,
          desc: newinfo.desc,
          createAt: newinfo.createAt,
          image: newinfo.image,
          id: newinfo._id,
          banners1: banners1,
          banners5: banners5,
          banners6: banners6,
          banners7: banners7
        })
      })
    } catch (error) {
      return console.log(error)
    }
    // next();
  },

  getFastId: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"});
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"});
    const banners7 = await Banners.findOne({"index": "7"})
    const id = req.params.id;
    // res.send(id)
    try {
      Fasts.findById(id, function(err, fast) {
        if(err) return console.log(err);
        res.render('client/FastId', {
          title: fast.title,
          subtitle: fast.subtitle,
          desc: fast.desc,
          createAt: fast.createAt,
          image: fast.image,
          id: fast._id,
          banners1: banners1,
          banners5: banners5,
          banners6: banners6,
          banners7: banners7
        })
      })
    } catch (error) {
      return console.log(error)
    }
    // next();
  },

  getTrendId: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"});
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"});
    const banners7 = await Banners.findOne({"index": "7"})
    const id = req.params.id;
    // res.send(id)
    try {
      Trends.findById(id, function(err, trend) {
        if(err) return console.log(err);
        res.render('client/TrendId', {
          title: trend.title,
          subtitle: trend.subtitle,
          desc: trend.desc,
          createAt: trend.createAt,
          image: trend.image,
          id: trend._id,
          banners1: banners1,
          banners5: banners5,
          banners6: banners6,
          banners7: banners7
        })
      })
    } catch (error) {
      return console.log(error)
    }
    // next();
  },

  getBlogs: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    const news = await News.find();
    const blogs = await Blog.find();
    const categories = await Category.find();
    const tags = await Tags.find();
    res.render('client/Blogs', {
      title: 'Home-Blogs',
      news: news,
      blogs: blogs,
      categories: categories,
      tags: tags,
      banners1: banners1,
      banners5: banners5,
      banners6: banners6
    })
  },

  getBlogId: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    const id = req.params.id;
    const news = await News.find();
    const blogs = await Blog.find();
    const categories = await Category.find();
    const tags = await Tags.find();

    try {
      Blog.findById(id, function(err, blog){
        if(err) return console.log(err);
        res.render('client/BlogsId', {
          // title: 'Home-Blogs',
          news: news,
          blogs: blogs,
          categories: categories,
          tags: tags,
          title: blog.title,
          subtitle: blog.subtitle,
          desc: blog.desc,
          postAt: blog.createAt,
          image: blog.image,
          id: blog._id,
          banners1: banners1,
          banners5: banners5,
          banners6: banners6
        })
      })
    } catch (error) {
      return console.log(error)
    }
  },

  getContact: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    res.render('client/Contact', {
      title: 'Contact',
      banners1: banners1,
      banners5: banners5,
      banners6: banners6
    })
  },

  getAbout: async (req, res, next) => {
    const banners1 = await Banners.findOne({"index": "1"})
    const banners5 = await Banners.findOne({"index": "5"})
    const banners6 = await Banners.findOne({"index": "6"})
    res.render('client/About', {
      title: 'About',
      banners1: banners1,
      banners5: banners5,
      banners6: banners6
    })
  }
}