const express = require("express");
const { register, login } = require("../../controllers/users");
const { validateBody } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// signup
router.post("/register", validateBody(userSchemas.registerSchema), register);

// signin
router.post("/login", validateBody(userSchemas.loginSchema), login);

module.exports = router;
