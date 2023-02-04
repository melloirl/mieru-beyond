const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Retorna a latência do bot!"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `Latência da API: ${client.ws.ping}\nPing do Client: ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms.`;
    interaction.editReply({
      content: newMessage,
    });
  },
};
