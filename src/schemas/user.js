const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userName: String,
  userIcon: { type: String, required: false },
});

module.exports = model("User", userSchema, "users");
