const express = require("express");
const {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
} = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(contactSchemas.addContactSchema), add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchemas.addContactSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
