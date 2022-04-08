const multer = require("multer");
const Filtro = (req, file, cb) => {
  if (
    file.mimetype.includes("application/msword") ||
    file.mimetype.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
    file.mimetype.includes("application/pdf")
  ) {
    cb(null, true);
  } else {
    cb("Please upload .doc, .docx, .pdf file.", false);
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/recursos/archivos/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage, fileFilter: Filtro });
module.exports = uploadFile;
