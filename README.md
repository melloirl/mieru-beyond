# Mieru BEYOND

Mieru BEYOND is a self-hosted Discord bot designed for personal use, built with JavaScript using the Discord.js library and Node.js. This revamped version is aimed at offering enhanced functionality and ease of use. Currently featuring a minimal set of commands, Mieru BEYOND is planned to incorporate additional Discord features.
## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Planned Features](#planned-features)
- [Contributing](#contributing)
- [License](#license)

## Requirements
![Discord.js](https://img.shields.io/badge/Discord.js-14.9.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.9.0-brightgreen)
![npm](https://img.shields.io/badge/npm-8.x-red)

- Node.js (version 18 or higher)
- NPM (version 8 or higher)
- Discord.js (version 14 or higher)
- A Discord bot token
- MongoDB

## Installation

1. Clone the repository or download the source code.

   ```
   git clone https://github.com/melloirl/mieru-beyond.git
   ```

2. Navigate to the project directory.

   ```
   cd mieru-beyond
   ```

3. Install the required dependencies.

   ```
   npm install
   ```

4. Replace the information in `.env` file with your own.

5. Start the bot.

   ```
   npm run start
   ```

## Usage

After successfully deploying Mieru BEYOND, invite the bot to your Discord server using the provided URL. Interact with the bot using the available commands.

## Commands

Mieru currently supports a basic set of slash commands. More commands will be added in future updates.

- `/ping`: Checks the bot's latency.
- `/help`: Displays a list of available commands.
- `/about`: Displays information about Mieru, its purpose, and its creator.
- `/anodicandriano`: Translates the input text into "Anodicandriano," a language from the fictional world of Raj.
- `/times`: Generates random teams of a specified size (between 2 and 30 players) and displays them in an embedded message with "Join" and "Leave" buttons.
- `/registrar`: Registers the user to Mieru's database if they are not registered, and sends a welcome message. If the user is already registered, it informs the user of their registration and ID.
- `/perfil`: Allows users to view and edit their profile. The "editar" subcommand updates the user's profile description, background color, and background image. The "ver" subcommand displays the user's customized profile and a message count.

## Planned Features

Mieru BEYOND's roadmap includes the following features:

- Music playback: Users will be able to play music from various sources within the Discord server.
- Customizable RPG features: A set of commands that allow for a fully customizable RPG experience will be integrated, allowing users to engage in gameplay without leaving Discord.


## Contributing

Contributions are welcome! 

## License

This project is licensed under the [MIT License](LICENSE).
