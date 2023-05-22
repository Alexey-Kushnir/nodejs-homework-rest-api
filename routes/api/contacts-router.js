const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers");
const validateBody = require("../../middlewares");
const schemas = require("../../schemas");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(schemas.addSchema), add);

router.put("/:contactId", validateBody(schemas.addSchema), updateById);

router.delete("/:contactId", deleteById);

module.exports = router;
