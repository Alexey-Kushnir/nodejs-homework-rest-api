const multer = require("multer");
const path = require("path");

// safe file in temp dir
const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
