const chalk = require('chalk');

module.exports = {
    name: 'disconnected',
    execute() {
        console.log(chalk.red('[DATABASE STATUS]: Disconnected from the database.'));
    },
};