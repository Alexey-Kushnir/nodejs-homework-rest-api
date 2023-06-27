const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204).send() or .end();
  res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = { deleteById: ctrlWrapper(deleteById) };
