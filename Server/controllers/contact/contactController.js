const { getContactModel } = require('../../model/schema/contact');

const getAllContacts = async (req, res) => {
  try {
    const Contact = await getContactModel();
    const contacts = await Contact.find({ deleted: false }).populate('createBy');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllContacts };
