const mongoose = require("mongoose");
const spaceSchema = new mongoose.Schema({
  _id: Number,
  number: Number,
  owner: String,
  status: String,
});
const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;
