const { register } = require("./register");
const { verifyUser } = require("./verifyUser");
const { resendVerifyEmail } = require("./resendVerifyEmail");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  verifyUser,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
