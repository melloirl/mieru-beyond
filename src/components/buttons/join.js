const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: "joinTeam",
  },
  async execute(interaction, client) {
    const current_players = interaction.message.embeds[0].fields[2].value
      .split(", ")
      .filter((player) => player !== "");
    const total_number_of_players = parseInt(
      interaction.message.embeds[0].description
        .split("(")[1]
        .split("/")[1]
        .split(")")[0]
    );
    // check if the user is already in the list
    if (!current_players.includes(interaction.user.username)) {
      // check if the number of players will reach the maximum
      if (current_players.length + 1 === total_number_of_players) {
        // get the embed from the message
        const receivedEmbed = interaction.message.embeds[0];
        // create a new embed with the same values as the received embed
        const newEmbed = EmbedBuilder.from(receivedEmbed);
        // update description with new number of signed up players
        newEmbed.data.description = `Times gerados!`;
        // add user to current players
        current_players.push(interaction.user.username);
        // add user to the new embed list of signed up players
        newEmbed.data.fields[2] = {
          name: "Jogadores",
          value: `${current_players.join(", ")}`,
        };
        // create two empty team lists
        const team1 = [];
        const team2 = [];
        // shuffle the players
        current_players.sort(() => Math.random() - 0.5);
        // add the first half of the players to team 1
        team1.push(...current_players.slice(0, current_players.length / 2));
        // add the second half of the players to team 2
        team2.push(...current_players.slice(current_players.length / 2));
        // add the teams to the embeds already existing fields
        newEmbed.data.fields[0] = {
          name: "Time Azul 💎💠",
          value: `${team1.join(", ")}`,
        };
        newEmbed.data.fields[1] = {
          name: "Time Vermelho 🏮🔺",
          value: `${team2.join(", ")}`,
        };
        // create two buttons for red team win and blue team win
        const redTeamWin = new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setLabel("Vermelho venceu!")
            .setCustomId("redTeamWin");
        const blueTeamWin = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setLabel("Azul venceu!")
            .setCustomId("blueTeamWin");
        // update embed with new values
        await interaction.update({ embeds: [newEmbed], components: [
            new ActionRowBuilder().addComponents([blueTeamWin, redTeamWin])
        ] });
      } else {
        // get the embed from the message
        const receivedEmbed = interaction.message.embeds[0];
        // create a new embed with the same values as the received embed
        const newEmbed = EmbedBuilder.from(receivedEmbed);
        // add user to current players
        current_players.push(interaction.user.username);
        // add user to the new embed list of signed up players
        newEmbed.data.fields[2] = {
          name: "Jogadores",
          value: `${current_players.join(", ")}`,
        };
        // update description with new number of signed up players
        newEmbed.data.description = `Esperando (${current_players.length}/${total_number_of_players}) jogadores...`;
        // update embed with new values
        await interaction.update({ embeds: [newEmbed] });
      }
    } else {
      await interaction.reply({
        content: "Você já está na lista de jogadores!",
        ephemeral: true,
      });
    }
  },
};
