// Configure dotenv
require("dotenv").config();

const { REST, Routes } = require("discord.js");
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.MIERU_CLIENT_ID;

const commands = [
  {
    name: "times",
    description: "Gera times aleatórios no tamanho desejado!",
    options: [
      {
        name: "players",
        description: "Quantas pessoas vão jogar?",
        type: 10,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "times") {
    // Get number of players from command options
    const numberofplayers = interaction.options.getNumber("players");
    console.log(numberofplayers);
    
    // Generate embed for response with action rows for buttons
    const embed = {
      // Function to reset all embed fields, title, description, color, etc.
      reset: function () {
        this.title = "Times";
        this.description = `Esperando (0/${numberofplayers}) jogadores...`;
        this.color = 0;
        this.fields = [
          {
            name: "Time Azul 💎💠",
            value: "",
          },
          {
            name: "Time Vermelho 🏮🔺",
            value: "",
          },
          // a field for signed up players
          {
            name: "Jogadores",
            value: "",
          },
        ];
      },
      title: "Times",
      description: `Esperando (0/${numberofplayers}) jogadores...`,
      fields: [
        {
          name: "Time Azul 💎💠",
          value: "",
        },
        {
          name: "Time Vermelho 🏮🔺",
          value: "",
        },
        // a field for signed up players
        {
          name: "Jogadores",
          value: "",
        },
      ],
    };
    // Generates action rows with green and red buttons to add and remove players
    const actionRows = [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 3,
            customId: "addPlayer",
            label: "PARTICIPAR",
          },
          {
            type: 2,
            style: 4,
            customId: "removePlayer",
            label: "SAIR",
          },
        ],
      },
    ];
    // When the remove player button is clicked, remove the user from the signed up players list
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === "removePlayer") {
        // Remove user from list of signed up players
        embed.fields[2].value = embed.fields[2].value.replace(
          `${interaction.user.username}\n`,
          ""
        );
        // Update description with new number of signed up players
        embed.description = `Esperando (${
          embed.fields[2].value.split("\n").length - 1
        }/${numberofplayers}) jogadores...`;
        // Update embed with new values
        await interaction.update({ embeds: [embed] });
      }
    });

    // When the number of signed up players is equal to the number of players, generate teams
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === "addPlayer") {
        // Add user to list of signed up players
        embed.fields[2].value += `${interaction.user.username}\n`;
        // Update description with new number of signed up players
        embed.description = `Esperando (${
          embed.fields[2].value.split("\n").length - 1
        }/${numberofplayers}) jogadores...`;
        // Get number of players from
        const players = numberofplayers;
        // Get number of signed up players
        const signedUpPlayers = embed.fields[2].value.split("\n").length - 1;
        // If the number of signed up players is equal to the number of players, generate teams
        if (players === signedUpPlayers) {
          // Update description with new number of signed up players
          embed.description = `Times gerados!`;
          // Get list of signed up players
          const playersList = embed.fields[2].value.split("\n");
          // Remove last element of list (empty string)
          playersList.pop();
          // Shuffle list of players
          for (let i = playersList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playersList[i], playersList[j]] = [playersList[j], playersList[i]];
          }
          // Split list of players in half
          const half = Math.ceil(playersList.length / 2);
          const firstHalf = playersList.splice(0, half);
          const secondHalf = playersList.splice(-half);
          // Add players to teams
          embed.fields[0].value = firstHalf.join("\n");
          embed.fields[1].value = secondHalf.join("\n");
          // Generate action rows with blue and red buttons to sinalize which team won
          const winnerRows = [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 1,
                  customId: "blueTeam",
                  label: "Azul venceu!",
                },
                {
                  type: 2,
                  style: 4,
                  customId: "redTeam",
                  label: "Vermelho venceu!",
                },
              ],
            },
          ];
          // Update embed with new values
          await interaction.update({ embeds: [embed], components: winnerRows });
          return;
        }
        // Update embed with new values
        await interaction.update({ embeds: [embed] });
      }
    });

    // if the blue team won change the embed color to blue and remove the action rows
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === "blueTeam") {
        // Change title to blue team won
        embed.title = "Azul venceu!";
        embed.color = 3447003;
        await interaction.update({ embeds: [embed], components: [] });
        // call embed object reset function
        embed.reset();
      }
    });
    // if the red team won change the embed color to red and remove the action rows
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === "redTeam") {
        // Change title to red team won
        embed.title = "Vermelho venceu!";
        embed.color = 15158332;
        await interaction.update({ embeds: [embed], components: [] });
        // call embed object reset function
        embed.reset();
      }
    });

    // Sends embed response with action rows
    await interaction.reply({ embeds: [embed], components: actionRows });
  }
});

client.login(TOKEN);
