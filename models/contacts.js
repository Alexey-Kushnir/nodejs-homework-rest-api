const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

// const contactsPath = path.resolve("models", "contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data) || null;
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((c) => c.id === id);
  return result || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
