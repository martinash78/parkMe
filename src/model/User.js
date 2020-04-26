const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  forename: String,
  surname: String,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
