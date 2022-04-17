const multer = require("multer");
const ImageFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("image") 
  ) {
    cb(null, true);
  } else {
    cb("Please upload only image file.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/recursos/images/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: ImageFilter });
module.exports = uploadFile;
