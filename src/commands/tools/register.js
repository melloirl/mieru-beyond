const User = require("../../schemas/user");
const mongoose = require("mongoose");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registrar")
    .setDescription("Junte-se à gloriosa evolução de Mieru! :D"),
  async execute(interaction, client) {
    let userProfile = await User.findOne({ userID: interaction.user.id });
    if (!userProfile) {
      userProfile = await new User({
        _id: mongoose.Types.ObjectId(),
        userID: interaction.user.id,
        userName: interaction.user.username,
        userIcon: interaction.user.avatarURL() || "None",
      });
      await userProfile.save().catch((err) => console.log(err));
      await interaction.reply({
        content: `Bem-vindo à gloriosa evolução, ${userProfile.userName}!`,
      });
    } else {
      await interaction.reply({
        content: `Você já está registrado, ${userProfile.userName}!\nSeu ID é: ${userProfile._id}.`,
      });
    }
  },
};
