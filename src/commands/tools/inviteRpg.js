const User = require("../../schemas/user");
const mongoose = require("mongoose");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Quer se juntar à expedição?"),
  async execute(interaction, client) {
    // Get the user id from the database
    const user = await client.db.User.findOne({
        discordId: interaction.user.id,
        })
        .catch((err) => console.log(err));
        // If the user is not in the database, reply with an error message
        if (!user) {
            return interaction.reply({
                content: "Você não está registrado! Digite /register para se registrar.",
                ephemeral: true,
            });
        }
        // If the user is in the database, reply with the invite link
        interaction.reply({
            content: `https://mierulabs.com/character-creation/?id=${user._id}`,
            ephemeral: true,
        });
  },
};
