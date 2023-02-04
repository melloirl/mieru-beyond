const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "blueTeamWin",
    },
    async execute(interaction,client) {
        // get the embed from the message
        const receivedEmbed = interaction.message.embeds[0];
        // create a new embed with the same values as the received embed
        const newEmbed = EmbedBuilder.from(receivedEmbed);
        // update title with the winner
        newEmbed.setTitle(`Time Azul venceu!`);
        // update description with the winner
        newEmbed.setDescription(`Parabéns ao time azul!`);
        // update the embed color to blue
        newEmbed.setColor(0x0000ff);
        // update embed
        await interaction.update({embeds: [newEmbed], components: []});
    }
}