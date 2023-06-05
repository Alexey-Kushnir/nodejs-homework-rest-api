const { User } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { userId } = req.params;
  const sbscr = req.body.subscription;

  if (sbscr === "starter" || sbscr === "pro" || sbscr === "business") {
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "User is not found");
    }
    return res.json(result);
  }
  throw HttpError(404, "Сhoose the right subscription type");
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
