const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
  
});

const UserModel = new mongoose.model("register", userSchema);
module.exports = { UserModel };
