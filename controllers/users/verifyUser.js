const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const verifyUser = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.status(200).json({ message: "Verify success" });
};

module.exports = { verifyUser: ctrlWrapper(verifyUser) };
