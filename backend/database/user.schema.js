const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: { type: String, required: false, unique: true, index: false, lowercase: true },
  username: { type: String, required: false },
  password: { type: String, required: false },
  verified: { type: Boolean, default: false },
  image_url: { type: String },
  ssoid: {type: String}
})

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
