const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const jsonParser = require('./jsonParser');
const upload = require('./upload');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  jsonParser,
  upload,
};
