const { Contact } = require('../../models');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;

  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      '-createdAt -updatedAt'
    ).populate('owner', 'name email');
    return res.json(result);
  }

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
