const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//création de model
const contactSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  message: { type: String, required: true }
});

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;
