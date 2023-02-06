const User = require("../../schemas/user");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Veja seus status no Mieruverso!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("editar")
        .setDescription("Edite seu perfil!")
        .addStringOption((option) =>
          option
            .setName("descricao")
            .setDescription("Sua descrição no perfil!")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("cor")
            .setDescription("A cor do seu perfil! (Exemplo: #ffffff)")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("imagem")
            .setDescription("A imagem de fundo do seu perfil! (URL)")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ver").setDescription("Veja seu perfil!")
    ),
  async execute(interaction, client) {
    // Get user data from the database
    let userProfile = await User.findOne({ userID: interaction.user.id });
    // If the user is not registered, reply with an error message
    if (!userProfile) {
      return interaction.reply({
        content: "Você não está registrado no Mieruverso!",
        ephemeral: true,
      });
    }
    // If the user is registered, check if subcommands are used
    if (interaction.options.getSubcommand() === "editar") {
      // check if color is a valid hex color
      if (
        interaction.options.getString("cor") &&
        !/^#[0-9A-F]{6}$/i.test(interaction.options.getString("cor"))
      ) {
        return interaction.reply({
          content: "A cor deve ser um código hexadecimal!",
          ephemeral: true,
        });
      }
      // check if image is a valid url
      if (
        interaction.options.getString("imagem") &&
        !/^https?:\/\/.+\..+$/i.test(interaction.options.getString("imagem"))
      ) {
        return interaction.reply({
          content: "A imagem deve ser uma URL válida!",
          ephemeral: true,
        });
      }
      // Update the user data
      await User.updateOne(
        { userID: interaction.user.id },
        {
          $set: {
            profileDescription: interaction.options.getString("descricao")
              ? interaction.options.getString("descricao")
              : userProfile.profileDescription,
            profileBackgroundColor: interaction.options.getString("cor")
              ? interaction.options.getString("cor")
              : userProfile.profileBackgroundColor,
            profileBackgroundImage: interaction.options.getString("imagem")
              ? interaction.options.getString("imagem")
              : userProfile.profileBackgroundImage,
          },
        }
      );
      // Reply with a success message
      interaction.reply({
        content: "Seu perfil foi atualizado com sucesso!",
        ephemeral: true,
      });
    } else {
      // If the user is registered, create a new embed
      const embed = new EmbedBuilder()
        .setTitle(userProfile.userName)
        .setDescription(userProfile.profileDescription)
        .setColor(userProfile.profileBackgroundColor)
        .setImage(
          userProfile.profileBackgroundImage !== "none"
            ? userProfile.profileBackgroundImage
            : interaction.user.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .addFields({
          name: "Mensagens enviadas",
          value: `${userProfile.messagesSent}`,
          inline: true,
        });

      // Reply with the embed
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
