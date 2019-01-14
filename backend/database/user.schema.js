const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: { type: String, required: false, unique: true, index: false, lowercase: true },
  password: { type: String, required: false }
})

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
