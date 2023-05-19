const express = require("express");

const crtl = require("../../controllers");
const validateBody = require("../../middlewares");
const schemas = require("../../schemas");

const router = express.Router();

router.get("/", crtl.getAll);

router.get("/:contactId", crtl.getById);

router.post("/", validateBody(schemas.addSchema), crtl.add);

router.put("/:contactId", validateBody(schemas.addSchema), crtl.updateById);

router.delete("/:contactId", crtl.deleteById);

module.exports = router;
