const multer = require('multer');
const path = require('path');
const { HttpError } = require('../helpers');

const tempDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = { fileSize: 1 * 1024 * 1024, fieldNameSize: 100 };

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (
    mimetype === 'image/png' ||
    mimetype === 'image/jpg' ||
    mimetype === 'image/jpeg'
  ) {
    return cb(null, true);
  }
  cb(null, false);
  return cb(HttpError(400, 'Only .png, .jpg and .jpeg format allowed'));
};

const upload = multer({
  fileFilter,
  limits,
  storage,
});

module.exports = upload;
