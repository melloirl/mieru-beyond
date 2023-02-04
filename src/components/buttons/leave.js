const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: {
        name: "leaveTeam",
    },
    async execute(interaction,client) {
        const current_players = interaction.message.embeds[0].fields[2].value.split("\n");
        const total_number_of_players = parseInt(interaction.message.embeds[0].description.split("(")[1].split("/")[1].split(")")[0]);
        const number_of_current_players = current_players.length;
        // check if user is in the list
        if (current_players.includes(interaction.user.username)) {
            // get the embed from the message
            const receivedEmbed = interaction.message.embeds[0];
            // create a new embed with the same values as the received embed
            const newEmbed = EmbedBuilder.from(receivedEmbed);
            // remove user from the new embed list of signed up players
            newEmbed.data.fields[2] = {
                name: "Jogadores",
                value: current_players.filter(player => player !== interaction.user.username).join("\n"),
            };
            // update description with new number of signed up players
            newEmbed.data.description = `Esperando (${number_of_current_players-1}/${total_number_of_players}) jogadores...`;
            // update embed with new values
            await interaction.update({ embeds: [newEmbed] });
        }
        else{
            await interaction.reply({
                content: "Você não está na lista de jogadores!",
                ephemeral: true,
            });
        }
    }
}