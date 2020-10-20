const mongoose = require("../Config/db");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  friend: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
