
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const movieSchema = mongoose.Schema({
  movieID: { type: String, required: false, unique: true, index: false },
  infoHash: { type: String, required: false, unique: true, index: false },
  moviePath: { type: String, required: false },
  status: { type: String, required: false },
  subtitles: [
    {
      fileName: String,
      filePath: String
    }
  ],
  movieStats: {}
})

movieSchema.plugin(findOrCreate);

module.exports = mongoose.model("Movie", movieSchema);