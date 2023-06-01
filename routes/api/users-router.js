const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/users");
const { validateBody, authenticate, jsonParser } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// signup
router.post(
  "/register",
  jsonParser,
  validateBody(userSchemas.registerSchema),
  register
);

// signin
router.post("/login", jsonParser, validateBody(userSchemas.loginSchema), login);

router.patch("/:userId", jsonParser, authenticate, updateSubscription);

router.get("/current", authenticate, getCurrent);

router.post("/logout", jsonParser, authenticate, logout);

module.exports = router;
