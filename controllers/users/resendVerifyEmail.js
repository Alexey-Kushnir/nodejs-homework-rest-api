const {
  HttpError,
  ctrlWrapper,
  sendEmail,
  verifyEmail,
} = require('../../helpers');
const { User } = require('../../models');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404);
  }

  if (user.verify) {
    throw HttpError(400, 'The email has already been verified ');
  }

  const vrfEmail = verifyEmail(email, user.verificationCode);

  await sendEmail(vrfEmail);

  res.status(200).json({ message: 'Verify email has been sent' });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
