const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userName: String,
  userIcon: { type: String, required: false },
  messagesSent: { type: Number, default: 0 },
  profileDescription: { type: String, required: false, default: "Um usuário comum!" },
  profileBackgroundColor: { type: String, required: false, default: "#ffffff" },
  profileBackgroundImage: { type: String, required: false, default: "none" },
});

module.exports = model("User", userSchema, "users");
