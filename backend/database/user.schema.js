const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true },
  password: { type: String, required: true },
  googleID: { type: String, require: false },
  intraID: { type: String, required: false }
})

module.exports = mongoose.model("User", userSchema);
