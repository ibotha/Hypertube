const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true },
  password: { type: String, required: true },
  googleId: { type: String, require: false },
  intraId: { type: String, required: false },
  facebookId: { type: String, required: false },
  twitterId: { type: String, required: false}
})
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
