const express = require('express');
const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require('../../controllers/contacts');
const {
  validateBody,
  isValidId,
  authenticate,
  jsonParser,
} = require('../../middlewares');
const { contactSchemas } = require('../../models');

const router = express.Router();

// use middleware for all routes
router.use(authenticate);

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post(
  '/',
  jsonParser,
  validateBody(contactSchemas.addContactSchema),
  add
);

router.put(
  '/:contactId',
  jsonParser,
  isValidId,
  validateBody(contactSchemas.addContactSchema),
  updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  jsonParser,
  validateBody(contactSchemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete('/:contactId', isValidId, deleteById);

module.exports = router;
