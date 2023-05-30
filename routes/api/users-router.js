const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// signup
router.post("/register", validateBody(userSchemas.registerSchema), register);

// signin
router.post("/login", validateBody(userSchemas.loginSchema), login);

router.patch("/:userId", authenticate, updateSubscription);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
