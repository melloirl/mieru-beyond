const Guild =  require("../../schemas/guild");
const User = require("../../schemas/user");
const mongoose = require("mongoose");

module.exports = {
    name: "messageCreate",
    async execute(message) {
        // If the message is sent by a bot, return
        if (message.author.bot) return;
        // Get guild id from the message
        const currentGuildID = message.guild.id;
        // Get guild from the database
        let currentGuild = await Guild.findOne({ guildID: currentGuildID });
        // If the guild is not on the database, check if the User is registered
        if (!currentGuild) {
            let userProfile = await User.findOne({ userID: message.author.id });
            // If the user is not registered, return
            if (!userProfile) return;
            // If the user is registered, create a new guild
            currentGuild = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: currentGuildID,
            });
            // Save the guild on the database
            await currentGuild.save().catch((err) => console.log(err));
        }
        // If the guild is on the database and the user is registered, add 1 to the messagesSent
        if (currentGuild) {
            let userProfile = await User.findOne({ userID: message.author.id });
            if (userProfile) {
                userProfile.messagesSent += 1;
                await userProfile.save().catch((err) => console.log(err));
            }
        }
    },
  };
  