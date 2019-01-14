const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const ssoidSchema = mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  ssoID: {  google: { type: String },
            facebook: { type: String },
            42: { type: String },
            twitter: { type: String },
            local: { type: String } }
})

ssoidSchema.plugin(findOrCreate);
module.exports = mongoose.model("ssoID", ssoidSchema);
