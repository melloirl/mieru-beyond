const chalk = require("chalk");

module.exports = {
  name: "err",
  execute() {
    console.log(
      chalk.red("An error has occurred with the database connection.")
    );
  },
};
