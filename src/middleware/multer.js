const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/banners')
  },

  filename: (req, file, cb) => {
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
    cb(null, file.filename + '-' + Date.now() + ext)
  }
});

const upload = multer({ storage: storage })

module.exports = upload;