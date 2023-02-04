const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("times")
    .setDescription("Gera times aleatórios no tamanho desejado!")
    .addIntegerOption((option) =>
      option
        .setName("numero_de_jogadores")
        .setDescription("Quantas pessoas vão jogar?")
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(30)
    ),

  async execute(interaction, client) {
    const max_players = interaction.options.getInteger("numero_de_jogadores");
    const embed = new EmbedBuilder()
      .setTitle("Times")
      .setDescription(`Esperando (0/${max_players}) jogadores...`)
      .addFields(
        {
          name: "Time Azul 💎💠",
          value: " ",
        },
        {
          name: "Time Vermelho 🏮🔺",
          value: " ",
        },
        {
          name: "Jogadores",
          value: " ",
        }
      );
    const joinButton = new ButtonBuilder()
      .setCustomId("joinTeam")
      .setLabel("PARTICIPAR")
      .setStyle(ButtonStyle.Success);
    const leaveButton = new ButtonBuilder()
      .setCustomId("leaveTeam")
      .setLabel("SAIR")
      .setStyle(ButtonStyle.Danger);
    await interaction.reply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents([joinButton, leaveButton]),
      ],
    });
  },
};
