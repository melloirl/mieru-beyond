const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Quer saber mais sobre Mieru?"),
  async execute(interaction, client) {
    const creator = await client.users.fetch(`149655287744167936`)
        .catch(console.error);
    const creatorAvatar = creator.displayAvatarURL();

    const embed = new EmbedBuilder()
        .setTitle("Sobre o Mieru")
        .setDescription("Mieru BEYOND é o sucessor robótico e virtual que irá substituir Pedry no longínquo ano de 2XXX.\nContando com uma variedade de comandos e utilidades, seu propósito é atender e entreter os usuários dos servidores em que <@!149655287744167936> está presente.")
        .setColor("#911472")
        .setImage(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
            url: `https://www.mierulabs.com`,
            iconURL: creatorAvatar,
            name: `Desenvolvido por Miel Starseeker`,
        })
        .setFooter({
            text: client.user.tag,
        })
        .setURL(`https://www.mierulabs.com`)
        await interaction.reply({
            embeds: [embed],
            });
  },
};
