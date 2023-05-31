const express = require("express");
const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  authenticate,
  jsonParser,
} = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(contactSchemas.addContactSchema),
  add
);

router.put(
  "/:contactId",
  jsonParser,
  authenticate,
  isValidId,
  validateBody(contactSchemas.addContactSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, deleteById);

module.exports = router;
