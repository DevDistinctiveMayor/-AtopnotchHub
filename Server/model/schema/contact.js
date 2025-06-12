const mongoose = require('mongoose');

// Helper to map string to Mongoose types
const mapType = (typeStr) => {
  switch (typeStr.toLowerCase()) {
    case 'string': return String;
    case 'number': return Number;
    case 'date': return Date;
    case 'boolean': return Boolean;
    case 'objectid': return mongoose.Schema.Types.ObjectId;
    case 'array': return Array;
    // add more mappings as needed
    default: return String; // fallback type
  }
};

const fetchSchemaFields = async () => {
  const CustomFieldModel = mongoose.model('CustomField');
  return await CustomFieldModel.find({ moduleName: "Contact" });
};

const contactSchema = new mongoose.Schema({
  interestProperty: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Properties',
  }],
  quotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Quotes',
  }],
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  createdDate: {
    type: Date,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const initializeContactSchema = async () => {
  const schemaFieldsData = await fetchSchemaFields();
  if (schemaFieldsData.length > 0) {
    schemaFieldsData[0].fields.forEach(item => {
      const mongooseType = mapType(item.backendType);
      const newField = { [item.name]: mongooseType };
      contactSchema.add(newField);
    });
  }
};

// Export a function to get the Contact model *after* schema initialization
let Contact;

const getContactModel = async () => {
  if (!Contact) {
    await initializeContactSchema();
    Contact = mongoose.model('Contacts', contactSchema, 'Contacts');
  }
  return Contact;
};

module.exports = { getContactModel, initializeContactSchema };
