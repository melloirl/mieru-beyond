const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "redTeamWin",
    },
    async execute(interaction,client) {
        // get the embed from the message
        const receivedEmbed = interaction.message.embeds[0];
        // create a new embed with the same values as the received embed
        const newEmbed = EmbedBuilder.from(receivedEmbed);
        // update title with the winner
        newEmbed.setTitle(`Time Vermelho venceu!`);
        // update description with the winner
        newEmbed.setDescription(`Parabéns ao time vermelho!`);
        // update the embed color to red
        newEmbed.setColor(0xff0000);
        // update embed
        await interaction.update({embeds: [newEmbed], components: []});
    }
}