const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${userId}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);

  await User.findByIdAndUpdate(userId, { avatarUrl });

  res.status(200).json({ avatarUrl });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
