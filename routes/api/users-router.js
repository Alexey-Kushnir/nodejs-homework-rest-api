const express = require('express');
const {
  register,
  verifyUser,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require('../../controllers/users');
const {
  validateBody,
  authenticate,
  jsonParser,
  upload,
} = require('../../middlewares');
const { userSchemas } = require('../../models');

const router = express.Router();

// signup
router.post(
  '/register',
  jsonParser,
  validateBody(userSchemas.registerSchema),
  register
);

router.get('/verify/:verificationCode', verifyUser);

router.post(
  '/verify',
  jsonParser,
  validateBody(userSchemas.emailSchema),
  resendVerifyEmail
);

// login
router.post('/login', jsonParser, validateBody(userSchemas.loginSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

router.patch('/:userId', authenticate, jsonParser, updateSubscription);

module.exports = router;
