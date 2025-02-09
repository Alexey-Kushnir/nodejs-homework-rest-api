const { Contact } = require('../../models');
const { HttpError, ctrlWrapper } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = { getById: ctrlWrapper(getById) };
