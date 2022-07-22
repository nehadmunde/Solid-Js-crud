const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
});

const userModel = mongoose.model("solid-user", userSchema);

module.exports = userModel;
