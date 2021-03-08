const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
// const methodOverride = require('method-override');

const app = express();
const uri = process.env.DB_URI;

//passport config
require('./middleware/passport')(passport);
// const initializePassport = require('./middleware/passport')
// initializePassport(passport, email => users.find(user => user.email === email))

//Home Routes Imports
const HomeRoute = require('./routes/homeRoute');

//Admin Routes Import
const authRoute = require('./routes/authRoute');
const AdminNewsRoute = require('./routes/newsRoute');
const AdminFastRoute = require('./routes/fastRoute');
const AdminTrendRoute = require('./routes/trendRoute');
const AdminCategoryRoute = require('./routes/categoryRoute');
const AdminBlogRoute = require('./routes/blogsRoute');
const AdminBannerRoute = require('./routes/bannerRoute');
const AdminTagRoute = require('./routes/tagsRoute');
const AdminDiscoverRoute = require('./routes/discoverRoute');

// const initialize = require('./middleware/passport');

//Database Config
mongoose.connect(`${uri}`, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect failed'));
db.once('open', () => {
  console.log('Connection Successfully...')
}, (error) => {
  if(error) throw error;
})

//Middleware config
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../', 'temp'),
  createParentPath: true,
  limits: { fileSize: 2 * 1024 * 1024 },
}));
app.use(session({
  secret: 'Secret',
  resave: true,
  saveUninitialized: true,
  // cookie: {secure: true}
}))
// app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Set global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next()
})


//Set View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//Routes Config
app.use('/admin/user', authRoute);
app.use('/admin/news', AdminNewsRoute);
app.use('/admin/fasts', AdminFastRoute);
app.use('/admin/trends', AdminTrendRoute);
app.use('/admin/cats', AdminCategoryRoute);
app.use('/admin/blogs', AdminBlogRoute);
app.use('/admin/banners', AdminBannerRoute);
app.use('/admin/tags', AdminTagRoute);
app.use('/admin/discovers', AdminDiscoverRoute);

app.use('/', HomeRoute);

module.exports = app;