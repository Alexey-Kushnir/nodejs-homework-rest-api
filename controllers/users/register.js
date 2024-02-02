const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { User } = require('../../models');
const gravatar = require('gravatar');
const {
  HttpError,
  ctrlWrapper,
  sendEmail,
  verifyEmail,
} = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid(6);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
    avatarUrl,
  });

  const vrfEmail = verifyEmail(email, verificationCode);

  await sendEmail(vrfEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: 'starter',
  });
};

module.exports = { register: ctrlWrapper(register) };
