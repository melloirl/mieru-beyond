const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anodicandriano")
    .setDescription("Traduz o que você fala para o idioma anodicandriano!")
    .addStringOption((option) =>
        option
            .setName("frase")
            .setDescription("A frase que você quer traduzir para o idioma anodicandriano")
            .setRequired(true)
    ),
  async execute(interaction, client) {
    // Get the message from the user
    const message = interaction.options.getString("frase");
    
    // Create a translating table where the keys are the vowels and the values are the vowels in backwards order
    const vowels = ["a", "e", "i", "o", "u"];
    const anodicandrianoTable = {};
    for (let i = 0; i < vowels.length; i++) {
        anodicandrianoTable[vowels[i]] = vowels.reverse()[i];
    }
    // Create a translating table where the keys are the consonants and the values are the consonants in backwards order
    const consonants = "bcdfghjklmnpqrstvxwyz".split("");
    for (let i = 0; i < consonants.length; i++) {
        anodicandrianoTable[consonants[i]] = consonants.reverse()[i];
    }

    // Add uppercase letters to the translating table
    for (const letter in anodicandrianoTable) {
        anodicandrianoTable[letter.toUpperCase()] = anodicandrianoTable[letter].toUpperCase();
    }

    // Create a copy of the message.
    let newMessage = message;

    // Regex to replace all accented letters with their non-accented version
    const regex = /[áàãâéêíóôõúüç]/gi;
    // Apply the regex to the message
    newMessage = newMessage.replace(regex, (match) => {
        switch (match) {
            case "á":
                return "a";
            case "à":
                return "a";
            case "ã":
                return "a";
            case "â":
                return "a";
            case "é":
                return "e";
            case "ê":
                return "e";
            case "í":
                return "i";
            case "ó":
                return "o";
            case "ô":
                return "o";
            case "õ":
                return "o";
            case "ú":
                return "u";
            case "ü":
                return "u";
            case "ç":
                return "c";
        }
    });

    let translatedMessage = ''
    // Loop through the message and translate it
    for (let i = 0; i < newMessage.length; i++) {
        const letter = newMessage[i];
        if (anodicandrianoTable[letter]) {
            translatedMessage += anodicandrianoTable[letter];
        } else {
            translatedMessage += letter;
        }
    }

    // Send the translated message
    await interaction.reply({
        content: translatedMessage,
    })
  },
};
