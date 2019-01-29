const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: { type: String, required: false, lowercase: true },
  firstName: { type: String, required: false},
  lastName: { type: String, required: false},
  username: { type: String, required: false },
  password: { type: String, required: false },
  verified: { type: Boolean, default: false },
  verification_key: { type: String, default: "You fucked up", required: true },
  image_url: { type: String },
  ssoid: { google: { type: String },
            intra: { type: String },
            facebook: { type: String },
            twitter: { type: String }
  }
})

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
